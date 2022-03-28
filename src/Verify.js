import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import * as web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NFTE } from '@nfte/react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const provider = new web3.providers.HttpProvider('https://mainnet.infura.io')

const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
})

export function Verify () {
    // Login System
    useEffect(() => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((newAccounts) => setUser({id: newAccounts[0]}));
    }, []);

    // Verify Constant
    // const erc = 'ERC721';
    const [erc, setErc] = useState('');
    const [user, setUser] = useState({
        id: ""
    });
    const [contract, setContract] = useState({
        id: ""
    });
    const [values, setValues] = useState({
        id: ""
    });
    const [open, setOpen] = useState(false);
    const [ownership, setOwnerShip] = useState(false)
    const [fetching, setFetching] = useState(false);

    const handleChange_Erc = (event) => {
        setErc(event.target.value);
      };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChange_Contract = (prop) => (event) => {
        setContract({ ...values, [prop]: event.target.value });
    };
    const handleChange_User = (prop) => (event) => {
        setUser({ ...values, [prop]: event.target.value });
    };

    const fetchData = async () => {
        // 使用 await 等待 API 取得回應後才繼續
        const balance = await seaport.getAssetBalance({
            accountAddress: user.id,
            asset: {
                tokenAddress: contract.id,
                tokenId: values.id,
                schemaName: erc
            },
        })
        console.log(balance.toString());
        (balance.toString() === "1" ? setOwnerShip(true) : setOwnerShip(false));
    };

    return (
        <div>
            <div className="searchBar">
            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap' }}> */}
                <FormControl fullWidth sx={{ m: 1, width: '20ch' }} variant="standard">
                    <InputLabel id="demo-simple-select-label">Erc</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={erc}
                    label="Erc"
                    onChange={handleChange_Erc}
                    >
                    <MenuItem value={'ERC721'}>ERC721</MenuItem>
                    <MenuItem value={'ERC1155'}>ERC1155</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '30ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-id">User Address</InputLabel>
                    <Input
                        id="standard-adornment-id"
                        value={user.id}
                        onChange={handleChange_User('id')}
                        startAdornment={<InputAdornment position="start"> - </InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '30ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-id">Contract(NFT) Address</InputLabel>
                    <Input
                        id="standard-adornment-id"
                        value={contract.id}
                        onChange={handleChange_Contract('id')}
                        startAdornment={<InputAdornment position="start"> - </InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '30ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-id">TokenID</InputLabel>
                    <Input
                        id="standard-adornment-id"
                        value={values.id}
                        onChange={handleChange('id')}
                        startAdornment={<InputAdornment position="start"> - </InputAdornment>}
                    />
                </FormControl>
            {/* </Box> */}
            </div>
                <div className='verifyBtn'>
                <Button sx={{ m: 2, width: '26.5ch' }}
                    onClick={() => {
                        setFetching(true);
                        setTimeout(() => {
                            setFetching(false);
                        }, 5000);
                        console.log("Verifying: ",erc, contract, user, values.id);
                        fetchData();
                        setOpen(true)
                    }}
                    variant="contained">Verify</Button>
                </div>

                <Box sx={{ width: '100%' }}>
                    <Collapse in={open && ownership && !fetching}>
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Verify Successfully!
                        </Alert>
                        <NFTE
                            contract={contract.id}
                            tokenId={values.id}
                            darkMode={false}
                            autoPlay={true} />
                    </Collapse>
                    <Collapse in={open && fetching}>
                        <Alert
                            severity="info"
                            sx={{ mb: 2 }}
                            icon={<AccessTimeIcon fontSize="inherit" />}
                        >
                            Now Verifying...
                        </Alert>
                    </Collapse>
                    <Collapse in={open && !ownership && !fetching}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Verify Failed!
                        </Alert>
                    </Collapse>
                </Box>
        </div>
    );
}
