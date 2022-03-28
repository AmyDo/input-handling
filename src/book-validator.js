
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

/*
  Page range string.

  Count, inclusively, the number of pages mentioned in the string.

  This is modeled after the string you can use to specify page ranges in
  books, or in a print dialog.

  Example page ranges, copied from our test cases:
    1          ===> 1 page
    p3         ===> 1 page
    1-2        ===> 2 pages
    10-100     ===> 91 pages
    1-3,5-6,9  ===> 6 pages
    1-3,5-6,p9 ===> 6 pages

  A range that goes DOWN still counts, but is never negative.

  Whitespace is allowed anywhere in the string with no effect.

  If the string is over 1000 characters, return undefined
  If the string returns in NaN, return undefined
  If the string does not properly fit the format, return 0

*/
function countPages(rawStr){


   str_list= removeWhitespace(rawStr).split(',');

   str_list.forEach(element => console.log(element));

   return 0
}

/*
  Perform a best-effort cleansing of the page number.
  Given: a raw string
  Returns: an integer, ignoring leading and trailing whitespace. And it can have p in front of it.
*/
function cleanPageNum(str){
   let new_str= removeWhitespace(str);
   console.log("new str=========> ",new_str)
   //check for negative number
   let match_negative= new_str.match(/-/);
   if ( match_negative !=null){
      console.log('contain - chars=>undefine')

      return undefined
   }

   //remove escape chars
   let esc_removed_str= removeWhitespace(new_str.replace(/[\n\r\t]/g, ''));


   //check if contain any char besides 'p'
   let contains_chars= esc_removed_str.match(/[a-nq-z]/i);
   if(contains_chars != null){

      console.log('contain uneessary chars undefine')
      return undefined
   }
   //check for p pattern
   let p_pattern= esc_removed_str.match(/^p(\d+)$/);
   if (p_pattern !=null){
      let answer= parseInt(p_pattern[1], 10);
      console.log(answer);
      return answer;
   }
   //check for sole number
   let sole_number_pattern= esc_removed_str.match(/\d+/);
   if (sole_number_pattern !=null && esc_removed_str.match(/p/) ==null){
      let answer_num= parseInt(sole_number_pattern[0],10);
      console.log(answer_num);
      return answer_num;
   }
   console.log('last undefined')
   return undefined;
}

function removeWhitespace(rawStr){
   let new_str= rawStr.replaceAll(/ /g,'');
   return new_str
}

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