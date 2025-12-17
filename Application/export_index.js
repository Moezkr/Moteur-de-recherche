const fs = require('fs')
const path = require('path')

const tsNodeConfig = {
    compilerOptions: { 
        module: "commonjs",
        target: "es2020",
        strict: false, 
    }
}

try {
    require('ts-node').register(tsNodeConfig)
} catch (e) {
    console.error("Erreur lors de l'enregistrement de ts-node. Installez ts-node: npm install ts-node")
    process.exit(1)
}

const indexer = require(path.join(process.cwd(), 'app/lib/indexer.ts'))

const OUTPUT_DIR = path.join(process.cwd(), 'data/index')

function mapToJson(map) {
    return Object.fromEntries(map)
}

function mapOfSetsToJson(map) {
    const obj = {}
    for (const [key, set] of map.entries()) {
        obj[key] = Array.from(set)
    }
    return obj
}

function saveIndexToFile(data, filename) {
    const filePath = path.join(OUTPUT_DIR, filename)
    console.log(`Sauvegarde de ${filename}...`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`Sauvegardé dans ${filePath}`)
}

try {
    console.log("--- Début de l'Exportation de l'Index ---")
    
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }

    const invertedIndexJson = mapOfSetsToJson(indexer.invertedIndex)
    saveIndexToFile(invertedIndexJson, 'inverted_index.json')

    const termFreqJson = {}
    for (const [url, tfMap] of indexer.termFreq.entries()) {
        termFreqJson[url] = mapToJson(tfMap)
    }
    saveIndexToFile(termFreqJson, 'doc_term_frequencies.json')
    
    const idfJson = mapToJson(indexer.idf)
    saveIndexToFile(idfJson, 'global_idf.json')

    console.log("\n--- Exportation de l'Index terminée ---")
    console.log(`Total de termes indexés : ${indexer.idf.size}`)
    console.log(`Total de documents indexés : ${indexer.documents.length}`)

} catch (error) {
    console.error("\nERREUR pendant l'exportation de l'index Vérifiez si ts-node est bien installé", error)
}
