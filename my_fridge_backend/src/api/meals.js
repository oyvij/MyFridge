'use strict';
require('babel-polyfill');
import { jwtAuth } from '../jwt';
import { Router } from 'express';
import { Home, Account, HomeItem, Item } from '../models';

const mealJsonStructureTemplate = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "mealtype": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "ingredients": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "image": {
            "type": "string"
          }
        },
      }
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["title", "mealtype", "description", "ingredients", "steps"]
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


export default ({ config }) => {
  let api = Router().use(jwtAuth);
  let openAiClient = config.openAiClient;

  let wrap = fn => (...args) => fn(...args).catch(args[2]);

  api.post('/scrape', wrap(async (req, res) => {
    try {
      const { type, strict } = req.body;
      const accountId = req.account.id;
      const account = await Account.findOne({ where: { id: accountId } });
      if (!account.hasMealScraperAccess) {
        res.status(403).json({ message: "You do not have access to this feature.", success: false });
        return;
      }
      const home = await Home.findOne({ where: { AccountId: accountId } });
      const homeItems = await HomeItem.findAll({
        where: { HomeId: home.id },
        include: [{ model: Item }]
      });
      const availableItems = shuffle(homeItems.map(homeItem => homeItem.Item));

      const systemContent = `You are a helpful assistant and chef designed to output JSON. Based on the ingredients the user has, suggest a delicious meals. The user will provide what type of meal they want. Only recommend a single meal in each response. Responses should be in a clear, structured format with headings, lists, and step-by-step instructions in English. The items/ingredients the user provide will be in a json format. Be prepared that the ingredients name, description, and category might not be in english, so you need to interpret what type of ingredient it is by using the category or description, but do NOT translate the ingredients from its original language to english when creating the response!. Keep the same structure as they were provided. Sometimes the name of the ingredient/item does not describe what the ingredient/item is. You must understand what the ingredient is by interpret all name, description and category. Strucutre the output as json in the same format as described in this jsonschema: ${JSON.stringify(mealJsonStructureTemplate, null, 2)}. Please use the data from the ingredients to populate the description in the meal json template. Also, please use the provided ingredients which mostly fits with the desired mealtype. ${strict ? 'You can not use ingredients not available.' : ''}. Also, try your best to ue common sense to determine what ingredients/items fit the mealtype. The mealtype must be ${type}`
      const userContent = `I have these ingredients available: \n\n ${JSON.stringify(availableItems, null, 2)} \n\n What can I make for ${type}${strict ? ' without using any other ingredients than the ones I have provided? This is very important! You can NOT use items or ingredients I dont have!' : '?'} The Mealtype must be ${type}`

      const completion = await openAiClient.chat.completions.create({
        messages: [
          {
            "role": "system",
            "content": systemContent
          },
          {
            "role": "assistant",
            "content": "I am a helpful assistant and a great chef that will help you find a delicious meal based on the ingredients you have. Please provide the type of meal you want.",
          },
          {
            "role": "user",
            "content": `The meal type I want is ${type}`
          },
          {
            "role": "assistant",
            "content": `Great! I will make a delicious ${type} meal for you. Can you please provide the ingredients you have in a json format so that I can interpret the properties?`
          },
          {
            "role": "user",
            "content": JSON.stringify(availableItems, null, 2)
          },
          {
            "role": "assistant",
            "content": `Thank you for providing the ingredients. Do you want me to strctlty use only the ingredients you have provided without using any other ingredients?`
          },
          {
            "role": "user",
            "content": strict ? "Yes, I want you to strictly use only the ingredients I have provided" : "No, you can suppliment with other ingredients if needed"
          },
          {
            "role": "assistant",
            "content": `I will now find a delicious ${type} meal for you, and pay goo attention to what the item/ingreedients are and how they are used in the meal.`
          }
        ],
        response_format: { type: "json_object" },
        model: "gpt-3.5-turbo",
        max_tokens: 1000 // Increased token limit to allow for more detailed responses
      });
      //const parsedData = JSON.parse(completion.choices[0].content);
      res.json({
        success: true,
        message: "Successfully scraped for meal suggestions",
        meal: JSON.parse(completion.choices[0].message.content)
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while scraping for meal suggestions", success: false });
    }
  }
  )
  )

  return api;
};
