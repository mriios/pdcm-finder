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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
