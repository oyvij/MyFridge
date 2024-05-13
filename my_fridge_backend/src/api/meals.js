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


export default ({ config }) => {
  let api = Router().use(jwtAuth);
  let openAiClient = config.openAiClient;

  let wrap = fn => (...args) => fn(...args).catch(args[2]);

  api.post('/scrape', wrap(async (req, res) => {
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
    const availableItems = homeItems.map(homeItem => homeItem.Item);

    const completion = await openAiClient.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": `You are a helpful assistant and chef designed to output JSON. Based on the ingredients the user has, suggest simple and delicious meals. The user will provide what type of meal they want. Only recommend a single meal in each response. Responses should be in a clear, structured format with headings, lists, and step-by-step instructions in Norwegian. Strucutre the output as json in the same format as described in this jsonschema: ${JSON.stringify(mealJsonStructureTemplate, null, 2)}. Please use the data from the ingredients to populate the description in the meal json template. Also, please use the provided ingredients which mostly fits with the desired mealtype. ${strict ? 'You can not use ingredients not available.' : ''}`
        },
        {
          "role": "assistant",
          "content": "I can help you create a meal. List the ingredients you have, and I'll guide you through the steps."
        },
        {
          "role": "user",
          "content": `I have these ingredients available: ${JSON.stringify(availableItems, null, 2)}. What can I make for ${type}${strict ? ' without using any other ingredients?' : '?'} The Mealtype must be ${type}`
        },
      ],
      response_format: { type: "json_object" },
      model: "gpt-3.5-turbo",
      max_tokens: 1000 // Increased token limit to allow for more detailed responses
    });
    //const parsedData = JSON.parse(completion.choices[0].content);
    res.json(JSON.parse(completion.choices[0].message.content));
  }))

  return api;
};
