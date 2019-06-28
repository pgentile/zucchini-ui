//Types de tir
var types = [
  "Admissibility",
  "New Features",
  "New features",
  "NR",
  "NR P0/P1",
  "NR P2/P3",
  "NR crossplatform",
  "Patrimoine",
  "CI",
  "Prépa JDD"
];

//Environnements pris en charge
var environnments = [
  "REL1",
  "REL2",
  "REL3",
  "USN1",
  "INT1",
  "INT2",
  "INT3",
  "PERF1",
  "PERF2",
  "PREP1",
  "PREP2",
  "P1-PRD1",
  "P1-PRD6",
  "P2-PRD2",
  "P2-PRD7",
  "PRD3"
];

export function getNom(valueNom, valueType) {
  var nom = valueType;

  /*Dans le cas où c'est l'existant, la variable n'est pas renseignée.
   *Tout est mis dans le champ type qui est alimenté par le champ jenkins NOM_RAPPORT_ZUCCHINI
   */
  if (valueNom == null) {
    //Pour chaque environnement, on vérifie s'il est défini dans le type. Si c'est le cas, on l'enlève
    types.forEach(function(element) {
      if (valueType.includes(element)) {
        nom = nom.replace(element, "");
      }
    });
    //Pour chaque environnement, on vérifie qu'il est défini dans le type. Si c'est le cas, on l'enlève
    environnments.forEach(function(element) {
      if (valueType.includes(element)) {
        nom = nom.replace(element, "");
      }
    });
    return nom;
  } else {
    return valueNom;
  }
}

export function getPlateforme(valuePlateforme, valueType) {
  /*Dans le cas où c'est l'existant, la variable n'est pas renseignée.
   *Tout est mis dans le champ type qui est alimenté par le champ jenkins NOM_RAPPORT_ZUCCHINI
   */
  if (valuePlateforme == null) {
    return getPlateformeFromNomRapportZucchini(valueType);
  } else {
    return valuePlateforme;
  }
}

/*Fonction permettant de récupérer le type dans l'existant
  Dans le cas de l'existant, le type sera renseignéavec de nouveaux éléments
  Dans le cas ou le type est renseigné dans son propre champs depuis l'interface Jenkins, seul le type est présent donc l'algo fonctionne
 */

export function getType(value) {
  //Valeur renvoyée au cas où l'environnement ne soit pas renseigné dans le type renvoyé
  var type = "NON DEFINI";

  //Pour chaque environnement, on vérifie qu'il est défini dans le type
  types.forEach(function(element) {
    if (value.includes(element)) {
      type = element;
    }
  });
  return type;
}

//Fonction permettant de récupérer la plateforme dans l'existant
export function getPlateformeFromNomRapportZucchini(value) {
  //Valeur renvoyée au cas où l'environnement ne soit pas renseigné dans le type renvoyé
  var env = "NON DEFINI";

  //Pour chaque environnement, on vérifie qu'il est défini dans le type
  environnments.forEach(function(element) {
    if (value.includes(element)) {
      env = element;
    }
  });
  return env;
}
//Fonction peremttant de récupérer  le type, nom et environnement du tir
export default function getTypeEnvName(testRun) {
  var separateur = " _";
  if (testRun.environment == undefined && testRun.name !== undefined) {
    return testRun.type + separateur + testRun.name;
  } else if (testRun.environment !== undefined && testRun.name == undefined) {
    return testRun.type + separateur + testRun.environment;
  } else if (testRun.environment == undefined && testRun.name == undefined) {
    return testRun.type;
  } else return testRun.type + separateur + testRun.name + separateur + testRun.environment;
}
