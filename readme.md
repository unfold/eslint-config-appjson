Validation for [app.json](https://devcenter.heroku.com/articles/app-json-schema)
--- 

## install
`npm install --save-dev eslint-plugin-appjson`

Then in your eslint config add `appjson` as plugin and the rules to apply.

```json
{
  "plugins": ["appjson"],
  "appjson/require-process-env-defined": 1
}
```

## Rule Details
### require-process-env-defined
Enforces that every variable used from `process.env` is defined in your app.json file.


## Contributing
Right now theres only 1 rule. If you have an idea for a good rule for this plugin, send a pull request or open an issue with your suggestion.
