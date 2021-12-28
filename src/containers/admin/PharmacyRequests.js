/* eslint-disable react/jsx-key */
import React,{useState} from "react";
import axios from 'axios';
import { backendUrl } from "../../urlConfig.js";
import TableScrollbar from 'react-table-scrollbar'

// @material-ui/core components
import { makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Table,TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from "../../components/Dashboard/Grid/GridItem.js";
import GridContainer from "../../components/Dashboard/Grid/GridContainer.js";
import Card from "../../components/Dashboard/Card/Card.js";
import CardHeader from "../../components/Dashboard/Card/CardHeader.js";
import CardBody from "../../components/Dashboard/Card/CardBody.js";
import Button from "../../components/Dashboard/CustomButtons/Button";
import PhotoSteps from "../../components/admin/dialogbox/PhotoSteps";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function PharmacyRequests() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState(""); //for search function

  //popup dialogbox
  const [openReject, setOpenReject] = React.useState(false);
  const handleClickOpenReject = (pharmacyid) => {
    setOpenReject(true);
    setPharmacyid(pharmacyid);
  };
  const handleCloseReject = () => {
    setOpenReject(false);
  };
  
  //backend connection for reject pharmacy
  const [pharmacyid,setPharmacyid] = useState();
  const [rejectreason, setRejectreason] = useState();
  const rejectPharmacy = () => {
    const token = window.localStorage.getItem('token');
    axios.post(`${backendUrl}/admin/rejectpharmacy`, {pharmacyid:pharmacyid,rejectreason:rejectreason}, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
  }).then((response)=>{
      console.log(response);
      getdata();
      handleCloseReject();
  }).catch((err)=>{
      console.log(err);
  });
};
  
  //backend connection for accept pharmacy
  const acceptPharmacy = (pharmacyid) => {
      const token = window.localStorage.getItem('token');
      axios.post(`${backendUrl}/admin/acceptpharmacy`, {pharmacyid:pharmacyid}, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
    }).then((response)=>{
        console.log(response);
        getdata();
    }).catch((err)=>{
        console.log(err);
    });
  };
  const [open, setOpen] = React.useState(false);
  const [doc1,setDoc1]= React.useState('');
  const [doc2,setDoc2]= React.useState('');
  const [doc3,setDoc3]= React.useState('');

  const handleClickOpen = (document1,document2,document3) => {
    setDoc1(document1);
    setDoc2(document2);
    setDoc3(document3);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 //backend connection
  const [data, setData] = useState([]);
  const getdata =() =>{
    const token = window.localStorage.getItem('token');
    axios.get(`${backendUrl}/admin/viewpharmacyrequests`,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
        })
      .then(res =>{
        const results =  res.data.result;
        setData(results);
      })    
  }
  React.useEffect(()=>{
    getdata();
  },[]);

  const columns = [
    { id: 'name', label: 'Name'},
    { id: 'email', label: 'Email'},
    { id: 'contactnumber', label: 'ContactNo'},
    { id: 'location', label: 'Location'},
    { id: 'document', label: 'Documents'},
    { id: 'activate', label: 'Activate'},
    { id: 'reject', label: 'Reject'},];
  const rows = data; 

  return (
    
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Pharmacy Registration Requests  </h4>
          </CardHeader>
          <CardBody>
            <div>
              <FormControl fullWidth variant="outlined" size="small">
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon/>
                    </InputAdornment>
                  }
                  onChange={(event)=>{
                    setSearchTerm(event.target.value);
                  }}
                  placeholder="Search..."
                  fontSize="small"
                  size="sm"
                />
              </FormControl>
            </div>
            <TableScrollbar rows={20}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell style={{color:'primary',backgroundColor: "white"}}
                              key={column.id}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      
                      <TableBody >
                        {rows.filter((row)=>{
                          if (searchTerm == "") {
                            return row
                          } else if (row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.email.toLowerCase().includes(searchTerm.toLowerCase()) 
                          // || row.location.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                            return row
                          }
                        }).map((row,id) => {
                          return(
                          <TableRow key={id}>
                            <TableCell align="left">
                              {row.name}
                            </TableCell>
                            <TableCell align="left">
                              {row.email}
                            </TableCell>
                            <TableCell align="left">
                              {row.contactnumber}
                            </TableCell>
                            <TableCell align="left">
                              {row.city}
                            </TableCell>
                            <TableCell align="left">
                            <Button size='sm' color="primary" onClick={()=>handleClickOpen(row.document1,row.document2,row.document3)}>View</Button>
                            </TableCell>
                            <TableCell>
                           <Button size='sm' color="primary" onClick={()=>acceptPharmacy(row.pharmacyid)}>Accept</Button>
                            </TableCell>
                            <TableCell align="left">
                            <Button size='sm' color="danger" onClick={()=>handleClickOpenReject(row.pharmacyid)}>Reject</Button>
                            </TableCell>
                          </TableRow>
                          );
                        }
                        )
                        }
                      </TableBody>
                    </Table>
                  </TableScrollbar>
          </CardBody>
        </Card>
      </GridItem>
            
      {/* view documents dialogbox */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Documents
        </DialogTitle>
        <DialogContent dividers>
          <PhotoSteps doc1={doc1} doc2={doc2} doc3={doc3}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/* reject button dialogbox */}
      <Dialog open={openReject} onClose={handleCloseReject} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reason to Reject the Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Reasons To reject the Request"}<br></br>

            {"1. Documents are not clear. Please re-register with necessary documents"}<br></br>
            {"2. Documents not Valid"}<br></br>
            {"3. Pharmacy Licence is overdue."}<br></br>
            {"4. Business Rejistration is overdue."}<br></br>

          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={(e) => setRejectreason(e.target.value)}
            label="State the reason"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReject} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>rejectPharmacy()} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}
