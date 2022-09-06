import axios from "axios";

const secret = import.meta.env.VITE_SECRET || "demo";
const herokuUrl = 'https://words-urvl.onrender.com'; //'https://polar-wave-72056.herokuapp.com';

/**
 * 获取单词本所有的单词，格式如下
 * @returns demo  [
    {
        "id":"2022-04-25",
        "list":[
            "blame"
        ]
    },
    {
        "id":"2022-05-02",
        "list":[
            "preset",
            "obvious"
        ]
    }
]
 */
export async function getAllLearningWords(){
  try{
    var tmp = sessionStorage.getItem("/words")
    if(tmp){
      console.log("words 从缓存中获取")
      return JSON.parse(tmp) 
    }
    var res = await axios.get(herokuUrl);
    var tmp = sessionStorage.setItem("/words", JSON.stringify(res.data))
    return res.data;
  }catch(e){
    console.error("获取单词本失败", e);
    return [];
  }
}

/**
 * 获取所有的单词列表
 * @returns demo : ["a", "ab"...]
 */
export async function getAllWords(){
  try{
    var tmp = sessionStorage.getItem("/list")
    if(tmp){
      console.log("list 从缓存中获取")
      return  JSON.parse(tmp)
    }
    var res = await axios.get('/list.json');
    sessionStorage.setItem("/list", JSON.stringify(res.data))
    return res.data;
  }catch(e){
    console.error("获取单词本失败", e);
    return [];
  }
}
/**
 * 查询单词的详解
 * @param {要查询的单词列表} words 
 * @returns 
 */
export async function getWordDetails(words){
  try{
    var tmp = words.map(word=>{
      if (sessionStorage.getItem("/word/"+word)) {
        return null;
      } else {
        return axios.get(`/dict/${word}.json`).then(res=>{
          var data = res.data
          sessionStorage.setItem("/word/"+word, JSON.stringify(data))
        }).catch(e=>{
          console.error(`${word}查询失败了`, e);
        })
      }
    })
    await Promise.all(tmp.filter(it=>it!=null))
    return words.map(word=>sessionStorage.getItem(`/word/${word}`) ? JSON.parse(sessionStorage.getItem(`/word/${word}`)) : null)
  }catch(e){
    console.log(e)
  }
}

export async function addWord(word){
  try{
    console.log(`add ${word}`)
    await axios({
      url: herokuUrl + '/add',
      method: "POST",
      data: {word, secret}
    });
  }catch(e){
    console.error("插入单词失败", word, e);
    throw e;
  }
}

export function clearWordNote(){
  sessionStorage.removeItem("/words");
  getAllLearningWords();
}
