CONFIG:

dataVersion on config.json is global, som db table entries has this column too, and both need ot match.
If they dont match, the code will always update the data and set the new dataVersion from config.json on the element.

