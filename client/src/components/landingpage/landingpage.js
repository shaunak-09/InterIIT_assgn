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


function Landingpage(props) {
    const handleclick = () => {
        props.setloginsignup(true);
      };
      const logout = () => {
        props.setLogstat(0);
        localStorage.removeItem("user_info");
        sessionStorage.removeItem("logstat");
    
        toast.success("Logged out successfully");
      };
      const [news, setNews] = useState([]);
      const [orinews, setOriNews] = useState([]);


      const getnews=({query}) => {
        
        const params={
            ...query,
            language:"en",
        }
        console.log(params);
        axios.get('http://localhost:8000/api/news',{
            params:params
        })
          .then(response =>{
            console.log(response.data);
             setNews(response.data)
             setOriNews(response.data)

          })
          .catch(error => console.log(error));
      };
     useEffect(()=>{
        getnews({});
     },[])
    
     const [searchquery, setSearchquery] = useState("")
     const handleSearch=()=>{
        getnews({query:{q:searchquery}})
     }

  const Card=({data})=>{
    // console.log(data);
    return(
    <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          image={data?.urlToImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
            class="p-3 bg-blue-500 left-5 top-2 absolute font-bold rounded-xl"
            onClick={logout}
          >
            LOGOUT
          </button>
          <div className="p-4 flex flex-col justify-center items-center">
            <div>
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
      <Button onClick={handleSearch}>Search</Button>

            </div>
          
      <div className="p-4 flex flex-wrap my-3 ">
        {
          news.map((item,index)=>(
                <Card data={item} key={`${index}+${index+1}`} />
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