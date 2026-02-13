const redis = require("redis");

const redisClient = redis.createClient(6379);

redisClient.connect().then(() => {
  console.log("Connected to Redis");
}).catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

const set = async (name, data)=>{
  const defaultTime = 60 * 5 // 5 minutes
  return await redisClient.set(`${name}:${data.id}`, JSON.stringify(data), { EX: defaultTime });
}

const get = async (name, data={})=>{
  if(data) return await redisClient.get(`${name}:${data.id}`);
  return await redisClient.get(name)
}

const del = async (name, data)=>{
  return await redisClient.del(`${name}:${data.id}`);
}

const limparTudo = async()=>{
  try{
    await redisClient.flushDb();
    console.log("Cache limpo com sucesso!")
    return true;
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  set, 
  get,
  del
};