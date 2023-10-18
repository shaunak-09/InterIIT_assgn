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
      const [country, setCountry] = useState('');

      const [news, setNews] = useState([]);
      const [orinews, setOriNews] = useState([]);
      const [searchquery, setSearchquery] = useState("")
      const [searchquery1,setSearchquery1]=useState("")

     const handleSearch=()=>{
        getnews();
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
      const handleChange1 = (event) => {
        setCountry(event.target.value);
      };
      const logout = () => {
        props.setLogstat(0);
        localStorage.removeItem("user_info");
        sessionStorage.removeItem("logstat");
    
        toast.success("Logged out successfully");
      };

      const getnews=() => {
        
        const params={
            q:searchquery,
            language:"en",
            country:country,
            category:category,

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
            getnews();
        }
      },[category])

      useEffect(()=>{
        if(country!="")
        {
            getnews();
        }
      },[country])

   
     useEffect(()=>{
        getnews();
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
            <div className="p-2 flex flex-col justify-center items-start w-[60%]">
                <div className="flex p-2 justify-center items-center">
                <TextField
                sx={{ minWidth: 200 }}
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
                <div className="ml-3 flex justify-center items-center">
                <TextField
                sx={{ minWidth: 200 }}
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
            
      

                </div>
        <div className="flex p-2 justify-center items-center">
        <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Category"
          onChange={handleChange1}
        >
        
              <MenuItem value="ae">United Arab Emirates</MenuItem>
              <MenuItem value="ar">Argentina</MenuItem>
              <MenuItem value="at">Austria</MenuItem>
              <MenuItem value="au">Australia</MenuItem>
              <MenuItem value="be">Belgium</MenuItem>
              <MenuItem value="bg">Bulgaria</MenuItem>
              <MenuItem value="br">Brazil</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              <MenuItem value="ch">Switzerland</MenuItem>
              <MenuItem value="cn">China</MenuItem>
              <MenuItem value="co">Colombia</MenuItem>
              <MenuItem value="cu">Cuba</MenuItem>
              <MenuItem value="cz">Czech Republic</MenuItem>
              <MenuItem value="de">Germany</MenuItem>
              <MenuItem value="ee">Estonia</MenuItem>
              <MenuItem value="eg">Egypt</MenuItem>
              <MenuItem value="es">Spain</MenuItem>
              <MenuItem value="fr">France</MenuItem>
              <MenuItem value="gb">United Kingdom</MenuItem>
              <MenuItem value="gr">Greece</MenuItem>
              <MenuItem value="hk">Hong Kong</MenuItem>
              <MenuItem value="hu">Hungary</MenuItem>
              <MenuItem value="id">Indonesia</MenuItem>
              <MenuItem value="ie">Ireland</MenuItem>
              <MenuItem value="il">Israel</MenuItem>
              <MenuItem value="in">India</MenuItem>
              <MenuItem value="it">Italy</MenuItem>
              <MenuItem value="jp">Japan</MenuItem>
              <MenuItem value="kr">South Korea</MenuItem>
              <MenuItem value="lt">Lithuania</MenuItem>
              <MenuItem value="lv">Latvia</MenuItem>
              <MenuItem value="ma">Morocco</MenuItem>
              <MenuItem value="mx">Mexico</MenuItem>
              <MenuItem value="my">Malaysia</MenuItem>
              <MenuItem value="ng">Nigeria</MenuItem>
              <MenuItem value="nl">Netherlands</MenuItem>
              <MenuItem value="no">Norway</MenuItem>
              <MenuItem value="nz">New Zealand</MenuItem>
              <MenuItem value="ph">Philippines</MenuItem>
              <MenuItem value="pl">Poland</MenuItem>
              <MenuItem value="pt">Portugal</MenuItem>
              <MenuItem value="ro">Romania</MenuItem>
              <MenuItem value="rs">Serbia</MenuItem>
              <MenuItem value="ru">Russia</MenuItem>
              <MenuItem value="sa">Saudi Arabia</MenuItem>
              <MenuItem value="se">Sweden</MenuItem>
              <MenuItem value="sg">Singapore</MenuItem>
              <MenuItem value="sk">Slovakia</MenuItem>
              <MenuItem value="th">Thailand</MenuItem>
              <MenuItem value="tr">Turkey</MenuItem>
              <MenuItem value="tw">Taiwan</MenuItem>
              <MenuItem value="ua">Ukraine</MenuItem>
              <MenuItem value="us">United States</MenuItem>
              <MenuItem value="ve">Venezuela</MenuItem>
              <MenuItem value="za">South Africa</MenuItem>


        </Select>
      </FormControl>
     
    </Box>
    <Box sx={{ minWidth: 200,ml:3 }}>
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
     
            </div>
          
      <div className="p-4 flex flex-wrap my-3 ">
        {
          news.length>0 ? (
            news.map((item,index)=>(
                <Card1 data={item} key={`${index}+${index+1}`} />
          ))
          )
          :
          (
            <h2>No Relevent News Available</h2>
          )


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