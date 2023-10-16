const axios=require("axios")
const getNews=async (req,res)=>{
    const paramater=req.query
    
    console.log(paramater);
    // console.log(topic);
    const options = {
        method: 'GET',
        url: 'https://newsapi.org/v2/top-headlines',
        params: {
            ...paramater,
            apiKey:"dbf283d3fce34a579720e66da08f0544",
            sortBy:"publishedAt",
        }
        
      };
      
      try {
          const response = await axios.request(options);
        //   console.log(response.data);
          res.status(200).json(response.data.articles)
      } catch (error) {
          console.error(error);
          res.status(402).json(error)
      }

}

module.exports=getNews