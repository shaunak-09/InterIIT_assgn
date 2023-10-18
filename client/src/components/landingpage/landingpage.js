import React, { useEffect, useState } from "react";
import "./landingpage.css";
// import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Landingpage(props) 
 {  
      const [category, setCategory] = useState('');
      const [news, setNews] = useState([]);
      const [orinews, setOriNews] = useState([]);
      const [searchquery, setSearchquery] = useState("")
      const [searchquery1,setSearchquery1]=useState("")

     const handleSearch=()=>{
        getnews({query:{q:searchquery}})
     }
     const handleSearch1=(value)=>{
        if(value=="")
        setNews(orinews)
    else {
        // console.log(value);
        // console.log(orinews);
        const data=orinews.filter((item)=>{return (item?.title.toLowerCase().includes(value.toLowerCase()))})
        setNews(data);
        console.log(data);

    }
        
        setSearchquery1(value);
        
     }
     


      const handleclick = () => {
        props.setloginsignup(true);
      };
      
      const handleChange = (event) => {
        setCategory(event.target.value);
      };
      const logout = () => {
        props.setLogstat(0);
        localStorage.removeItem("user_info");
        sessionStorage.removeItem("logstat");
    
        toast.success("Logged out successfully");
      };

      const getnews=({query}) => {
        
        const params={
            ...query,
            language:"en",
        }
        // console.log(params);
        axios.get('http://localhost:8000/api/news',{
            params:params
        })
          .then(response =>{
            // console.log(response.data);
             setNews(response.data)
             setOriNews(response.data)

          })
          .catch(error => console.log(error));
      };
      
      useEffect(()=>{
        if(category!="")
        {
            getnews({query:{category:category}})
        }
      },[category])

   
     useEffect(()=>{
        getnews({});
     },[])
    
     

  const Card1=({data})=>{
    // console.log(data);
    return(
    <Card sx={{ maxWidth: 400 }}
    className="p-2 mx-8 my-4 cursor-pointer ">
        <CardMedia
          component="img"
          height="100"
          image={data?.urlToImage}
          alt="image"
        //   onError={this.src='placeholder.jpg'} 
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.content}
          </Typography>
        </CardContent>
    </Card>
    )
  }

  return (
        <div className="p-4 flex flex-col justify-center items-center">

      {props.logstat == 1 ? (
        <>
          <button
            class="p-3 mb-2 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={logout}
          >
            LOGOUT
          </button>
          <div className="py-10 px-10 flex flex-col justify-center items-center">
            <div className="p-2 flex justify-center items-center">
            <TextField
        id="input-with-icon-textfield"
        label="Search Headline"
        value={searchquery1}
        onChange={(e)=>{
            handleSearch1(e.target.value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
                <div className="mx-8 flex justify-center items-center">
                <TextField
        id="input-with-icon-textfield"
        label="Search By Keywords"
        value={searchquery}
        onChange={(e)=>{
            setSearchquery(e.target.value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button variant="outlined" onClick={handleSearch} sx={{mx:1}} className="p-3">Search</Button>

                </div>
            
      <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="entertainmen">Entertainment</MenuItem>
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="science">Science</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>


        </Select>
      </FormControl>
    </Box>
            </div>
          
      <div className="p-4 flex flex-wrap my-3 ">
        {
          news.map((item,index)=>(
                <Card1 data={item} key={`${index}+${index+1}`} />
          ))

        }
      </div>
          </div>

          </>
          
      )
      :
      (
        <>
          <button
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={handleclick}
          >
            SIGNIN
          </button>
        </>

       )
 }
</div>
   )
}
  


export default Landingpage