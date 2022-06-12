var sass = require("sass");
var autoPrefixer = require("autoprefixer");
var fs = require("fs");
var postCSS = require("postcss");
const { cloneElement } = require("react");

function compile(path) {
	console.log("info", "Compiling css");
	const buildPath = path.replace("scss", "css");
	try {
		const result = sass.compile(path, { style: "compressed" });
		postCSS([autoPrefixer])
			.process(result.css)
			.then((res) => {
				res.warnings().forEach((warning) => {
					console.log("warning", warning.toString());
				});
				console.log("info", "sucessfully compiled sass");
				fs.writeFile(buildPath, res.css, (error) => {
					if (error) {
						console.log("error", "file write error: ", error);
						throw Error;
					} else {
						console.log("info", "successfully saved css");
						console.log("buildPath: ", buildPath);
						// if (process.argv[3] === "watch" && isImport) {
						// 	sassPaths.react.forEach((path) => {
						// 		if (!checkImport(path)) {
						// 			compile(path);
						// 		}
						// 	});
						// }
					}
				});
			});
	} catch (e) {
		console.log("sass compile error: ", e);
	}
}

const paths = [
	"./styles/global.scss",
	"./styles/utils.module.scss",
	"./components/drawer.module.scss",
	"./components/layout.module.scss"
];
if (process.argv[2] === "watch") {
	console.log("info", "watching sass for changes");
	paths.forEach((path) => fs.watchFile(path, () => compile(path)));
} else {
	paths.forEach(compile);
}
