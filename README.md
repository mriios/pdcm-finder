# PCDM Finder - Expression data heatmap
`ReactJS, React-bootstrap, Typescript, Nivo, React Bootstrap Typeahead`

## Folder structure
Project has a folder structure which allows for future scalability, keeping matters separated.

## Data parsing
Data was parsed in a way that could be read by the heat map chart. 
Transforming the previously fetched `.tsv` file into a `json` format. Extra information was stripped out of the gene modals, keeping usable data to work with. In this same function, other values needed were extracted into their own elements for later use.

It was built this way so we filter the data we need on every change, ensuring all 3 filters work in conjuction and depending on the others to return correct and updated information.

## Filtering
For each filter (gene, diagnosis, range), a function ran after a change in them. 

### Gene filter
When selecting a gene, it loops through the data and returns the data objects where the `id`s matched the selected `id`s. This handles the rows of the heat map.

### Diagnosis filter
After a diagnosis is picked, the data is filtered showing only data objects where diagnosis matches each individual model identifier. Diagnosis filter manages the columns in the chart. 

### Range picker
When the range is slid, the top percentage of values will be shown in the chart. This is based on an array of all values together and sorted. This arrays length is used in a math equation to get the value that is the base of the percentage of values we're looking for. 

## Z-score
Min and max values of filtered data were used to visualize an exact scale and colors. 
