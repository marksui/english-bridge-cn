import fs from "node:fs";
import ts from "typescript";

const sourcePath = "src/data/vocabulary.ts";
const sourceText = fs.readFileSync(sourcePath, "utf8");
const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true);

const readLiteral = (node) => {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) return declarations[node.text];
  if (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    ["major", "term"].includes(node.expression.text)
  ) {
    const [word, chinese, hint] = node.arguments.map(readLiteral);
    return hint ? { word, chinese, hint } : { word, chinese };
  }
  if (ts.isArrayLiteralExpression(node)) {
    const values = [];
    for (const element of node.elements) {
      if (ts.isSpreadElement(element)) {
        const spreadValue = readLiteral(element.expression);
        if (Array.isArray(spreadValue)) values.push(...spreadValue);
        else values.push(spreadValue);
      } else {
        values.push(readLiteral(element));
      }
    }
    return values;
  }
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = property.name;
      const key = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : name.getText(sourceFile);
      value[key] = readLiteral(property.initializer);
    }
    return value;
  }
  return undefined;
};

const declarations = {};

const visit = (node) => {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
    declarations[node.name.text] = readLiteral(node.initializer);
  }
  ts.forEachChild(node, visit);
};

visit(sourceFile);

const rawCategories = declarations.rawCategories ?? [];
const categoryImageSources = declarations.categoryImageSources ?? {};
const wikiPageWordImages = declarations.wikiPageWordImages ?? {};
const directUrlWordImages = declarations.directUrlWordImages ?? {};
const fallbackOnlyWordImages = declarations.fallbackOnlyWordImages ?? {};

const normalize = (value) => value.toLowerCase();
const errors = [];
const counters = { wikiPage: 0, directUrl: 0, fallbackOnly: 0 };
const oldRandomProvider = ["lorem", "flickr"].join("");
const implicitGuessMarkers = [
  ["real", "Photo", "Category", "Ids"].join(""),
  ["title", "Case", "(title)"].join(""),
];

if (sourceText.includes(oldRandomProvider)) {
  errors.push("Old random image provider still appears in source.");
}

if (implicitGuessMarkers.some((marker) => sourceText.includes(marker))) {
  errors.push("Implicit Wikipedia guessing logic still appears in source.");
}

for (const category of rawCategories) {
  if (!categoryImageSources[category.id]) {
    errors.push(`Missing category image source: ${category.id}`);
  }

  for (const word of category.words) {
    const key = normalize(word.word);
    const sources = [];
    const wikiPage = wikiPageWordImages[category.id]?.[key];
    const directUrl = directUrlWordImages[category.id]?.[key];
    const fallbackWords = (fallbackOnlyWordImages[category.id] ?? []).map(normalize);
    const categoryFallbackOnly = categoryImageSources[category.id]?.mode === "fallbackOnly";

    if (wikiPage) sources.push("wikiPage");
    if (directUrl) sources.push("directUrl");
    if (fallbackWords.includes(key) || (categoryFallbackOnly && !wikiPage && !directUrl)) {
      sources.push("fallbackOnly");
    }

    if (sources.length !== 1) {
      errors.push(`Expected exactly one image source for ${category.id}:${word.word}, found ${sources.length}.`);
      continue;
    }

    counters[sources[0]] += 1;

    if (sources[0] === "wikiPage" && wikiPage.trim().length === 0) {
      errors.push(`Empty wiki page title for ${category.id}:${word.word}.`);
    }

    if (sources[0] === "directUrl" && !/^https?:\/\//.test(directUrl)) {
      errors.push(`Direct image URL must be absolute for ${category.id}:${word.word}.`);
    }
  }
}

const sourceFor = (categoryId, word) => {
  const key = normalize(word);
  if (wikiPageWordImages[categoryId]?.[key]) return ["wikiPage", wikiPageWordImages[categoryId][key]];
  if (directUrlWordImages[categoryId]?.[key]) return ["directUrl", directUrlWordImages[categoryId][key]];
  if ((fallbackOnlyWordImages[categoryId] ?? []).map(normalize).includes(key)) return ["fallbackOnly", ""];
  if (categoryImageSources[categoryId]?.mode === "fallbackOnly") return ["fallbackOnly", ""];
  return ["missing", ""];
};

const requiredSamples = [
  ["advanced-health", "gastroenteritis", "wikiPage", "Gastroenteritis"],
  ["emotions", "anxious", "fallbackOnly", ""],
  ["emotions", "depressed", "fallbackOnly", ""],
  ["body-pain", "stomachache", "fallbackOnly", ""],
  ["pharmacy", "pharmacy", "wikiPage", "Pharmacy"],
  ["university-subjects", "computer science", "fallbackOnly", ""],
  ["academic-basics", "framework", "fallbackOnly", ""],
  ["research-coursework", "academic integrity", "fallbackOnly", ""],
  ["math-concepts", "ordinary differential equation", "fallbackOnly", ""],
  ["math-concepts", "topology", "fallbackOnly", ""],
  ["cs-concepts", "algorithm", "fallbackOnly", ""],
  ["physics-engineering-concepts", "thermodynamics", "fallbackOnly", ""],
  ["life-science-concepts", "clinical trial", "fallbackOnly", ""],
  ["econ-business-concepts", "opportunity cost", "fallbackOnly", ""],
  ["social-humanities-concepts", "qualitative research", "fallbackOnly", ""],
  ["college-computing-math-physical", "Artificial Intelligence", "fallbackOnly", ""],
  ["college-engineering-majors", "Bioengineering (Bioinformatics)", "fallbackOnly", ""],
  ["college-life-health-environment", "Public Health with Concentration in Epidemiology", "fallbackOnly", ""],
  ["college-social-policy-business", "Political Science/Data Analytics", "fallbackOnly", ""],
  ["college-humanities-arts-language", "International Studies - International Business (Jt BA/MIA)", "fallbackOnly", ""],
  ["college-major-options", "Undeclared - Physical Sciences", "fallbackOnly", ""],
  ["insurance-billing", "deductible", "fallbackOnly", ""],
  ["documents-immigration", "work authorization", "fallbackOnly", ""],
  ["job-search-interview", "behavioral question", "fallbackOnly", ""],
  ["mental-health-therapy", "panic attack", "fallbackOnly", ""],
  ["academic-writing-advanced", "statistical significance", "fallbackOnly", ""],
  ["phrasal-verbs-daily", "figure out", "fallbackOnly", ""],
  ["campus-services", "degree audit", "fallbackOnly", ""],
  ["news-policy-advanced", "executive order", "fallbackOnly", ""],
];

for (const [categoryId, word, expectedMode, expectedValue] of requiredSamples) {
  const [mode, value] = sourceFor(categoryId, word);
  if (mode !== expectedMode || (expectedValue && value !== expectedValue)) {
    errors.push(`Sample ${categoryId}:${word} expected ${expectedMode} ${expectedValue}, got ${mode} ${value}.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const wordCount = rawCategories.reduce((total, category) => total + category.words.length, 0);
console.log(
  `Image coverage OK: ${rawCategories.length} categories, ${wordCount} words; ` +
    `${counters.wikiPage} wiki, ${counters.directUrl} direct, ${counters.fallbackOnly} fallback.`,
);
