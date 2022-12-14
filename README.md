A simple CLI to convert columns of CSV and TSV files to multiple json files.

The first column of the CSV defines the keys of the exported object.

The first row of the CSV defines the filename of each exported json file. 



## Usage:

### CSV to JSON
`npx col2json translations.csv`

### TSV to JSON
`npx col2json translations.tsv`

### Specify output directory
`npx col2json translations.tsv mydirectory`


## Example

Given a translation.csv file with this content

| key   | en    | it     | es     |
|-------|-------|--------|--------|
| hello | Hello | Ciao   | Hola   |
| code  | Code  | Codice | Codigo |

running 
`npx col2json translations.csv`
will create 3 json files:

en.json
```
{
    "hello": "Hello",
    "code": "Code"
}
```
it.json
```
{
    "hello": "Ciao",
    "code": "Codice"
}
```

es.json
```
{
    "hello": "Hola",
    "code": "Codigo"
}
```