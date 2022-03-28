
const block_titles = ["Boaty McBoatface"];



// Sanity check method to make sure you have your environment up and running.
function sum(a, b){
  return a + b;
}
/*
  Valid book titles in this situation can include:
    - Cannot be any form of "Boaty McBoatface", case insensitive
    - English alphabet characters
    - Arabic numerals
    - Spaces, but no other whitespace like tabs or newlines
    - Quotes, both single and double
    - Hyphens
    - No leading or trailing whitespace
    - No newlines or tabs
*/
function isTitle(str){
let new_str= str.trim()
if (new_str!==str){
return false;
}
 if (/^[-\w'" 0-9\p{L}]+$/gu.test(new_str.normalize('NFC')) ==true){
    return block_titles.some((title) => { return new_str.toLowerCase()!==title.toLowerCase();});
 }
 return false;
}


function cleanPageNum(rawStr){ return 0; }

/*
  Are the two titles *effectively* the same when searching?

  This function will be used as part of a search feature, so it should be
  flexible when dealing with diacritics and ligatures.

  Input: two raw strings
  Output: true if they are "similar enough" to each other

  We define two strings as the "similar enough" as:

    * ignore leading and trailing whitespace
    * same sequence of "letters", ignoring diacritics and ligatures, that is:
      anything that is NOT a letter in the UTF-8 decomposed form is removed
    * Ligature "\u00E6" or æ is equivalent to "ae"
    * German character "\u1E9E" or ẞ is equivalent to "ss"
*/
function isSameTitle(strA, strB){
   if(typeof(strA) != typeof(strB)){
      return false;
   }
   let new_strA= strA.trim().normalize("NFD").normalize("NFKD").replaceAll(/[\u0300-\u036f]/g, "").replaceAll(/æ/g, "ae").replaceAll(/[^\x00-\x7F]/g,"");
   let new_strB= strB.trim().normalize("NFD").normalize("NFKD").replaceAll(/[\u0300-\u036f]/g, "").replaceAll(/æ/g, "ae").replaceAll(/[^\x00-\x7F]/g,"");



//   console.log(new_strA.replaceAll(/[^\x00-\x7F]/g,""));
//   console.log(new_strB.replaceAll(/[^\x00-\x7F]/g,""));

   if (new_strA===new_strB){
      return true;
   }else{

      return false;
   }
}
function countPages(rawStr){ return 0; }
function cleanForHTML(dirty) { return dirty; }

// Too all my JS nitpickers...
// We are using CommonJS modules because that's what Jest currently best supports
// But, the more modern, preferred way is ES6 modules, i.e. "import/export"
module.exports = {
  sum,
  isTitle,
  countPages,
  cleanPageNum,
  isSameTitle,
  cleanForHTML,
};