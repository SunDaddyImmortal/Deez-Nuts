import { Box, Button, Flex, Input, Text, Stack,Textarea,Grid,} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import BButton from "./BButton.png";
import CButton from "./CButton.png";
import TokenButton from "./TokenButtonC.png";
import DButton from "./DButton.png";
import AButton from "./AButton.png";
import DeadNautABI from "../src/DeadNaut.json";
import LifeCardABI from "../src/LifeCard.json";
import TokenApproverABI from "./TokenApprover.json";
import ReactDOM from 'react-dom';

const FANTOM_NETWORK_ID = 250;

const provider = window.ethereum;
const web3 = new Web3(provider || 'https://rpc.ankr.com/fantom');

let isConnected = false; 

const LifeCardAddress = '0x5e102A7248C7d821d583CB2707C18499FCb63Da8';
const LifeCardInstance = new web3.eth.Contract(LifeCardABI, LifeCardAddress);

const DeadNautAddress = '0xA68a5A778ea63A0DCCe6e7ab5e8C6A472496d653';
const DeadNautInstance = new web3.eth.Contract(DeadNautABI, DeadNautAddress)

const TokenApproverAddress = '0x99BF74e316cE0718063a26f7BbBC55bfFd4E2608';
const TokenApproverInstance = new web3.eth.Contract(TokenApproverABI, TokenApproverAddress);

const LifeCardTESTAddress = '0x8A5b2a248c7E1739294b854bE810f5110C54f251';
const LifeCardTESTInstance= new web3.eth.Contract(LifeCardABI, LifeCardTESTAddress);

const DeadNautTESTAddress = '0x1cE73F6DaecBB3b99A7c28bda102ff6c08231764';
const DeadNautTESTInstance = new web3.eth.Contract(DeadNautABI, DeadNautTESTAddress);

const DeadNaut = ({ accounts, setAccounts }) => {
  const [quantity, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
 
  async function mintTokens() {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    if (!web3.utils.isAddress(sender)) {
      console.error("Invalid sender address:", sender);
      return;
    }
  
    const gasPrice = await web3.eth.getGasPrice();
    const price = 10;
    const value = web3.utils.toWei((price * quantity).toString(), "ether");

    LifeCardInstance.methods.mint(quantity)
      .send({ from: sender, value: value, gasPrice: gasPrice })
      .on("transactionHash", (hash) => {
        console.log("Transaction Hash:", hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log("Confirmation Number:", confirmationNumber);
        console.log("Receipt:", receipt);
      })
    }

    async function mintTokensTEST() {
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];
    
      if (!web3.utils.isAddress(sender)) {
        console.error("Invalid sender address:", sender);
        return;
      }
    
      const value = web3.utils.toWei((0 * quantity).toString(), "ether"); // Set the price to zero
    
      LifeCardTESTInstance.methods.mint(quantity)
        .send({ from: sender, value: value })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Confirmation Number:", confirmationNumber);
          console.log("Receipt:", receipt);
        });
    }

async function ToggleMenuV(){ 
  if (!TestMenu) {
  setVMenu(!VMenu);
} else {
  setTestMenu(!TestMenu);
}
setVMenu(!VMenu);
}
async function ToggleMenuTEST(){ 
  if (!setVMenu) {
  setVMenu(!VMenu);
} else {
  setTestMenu(!TestMenu);
}
setVMenu(!VMenu);
}


async function approveTheTokens() {

  const accounts = await web3.eth.getAccounts();

  const spender = DeadNautAddress;
  const tokens = ApproveTokens;

  // Call the contract function
  TokenApproverInstance.methods.approveTokens(tokens, spender).send({from: accounts[0]})
      .on('receipt', function(receipt){
          console.log(receipt);
          console.log (newApproveTokens)
      })
      .on('error', function(error, receipt) {
          console.log(error);
      });
}

async function approveTheTokensTEST() {

  const accounts = await web3.eth.getAccounts();

  const spender = DeadNautTESTAddress;
  const tokens = ApproveTokens;

  // Call the contract function
  TokenApproverInstance.methods.approveTokens(tokens, spender).send({from: accounts[0]})
      .on('receipt', function(receipt){
          console.log(receipt);
          console.log (newApproveTokens)
      })
      .on('error', function(error, receipt) {
          console.log(error);
      });
}

  async function deleteAddressArray() {
    // Check if Web3 is injected
    if (typeof window.ethereum !== 'undefined') {
      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);
  
      // Request user account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Get the user's account address
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Create a contract instance
      const contract = new web3.eth.Contract(DeadNautABI, DeadNautAddress);
  
      try {
        await contract.methods.deleteAddressArray().send({ from: userAddress });
        console.log('Address array deleted successfully!');
      } catch (error) {
        console.error('Error deleting address array:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  }
  
  async function deleteAddressArrayTEST() {
    // Check if Web3 is injected
    if (typeof window.ethereum !== 'undefined') {
      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);
  
      // Request user account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Get the user's account address
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Create a contract instance
      const contract = new web3.eth.Contract(DeadNautABI, DeadNautTESTAddress);
  
      try {
        await contract.methods.deleteAddressArray().send({ from: userAddress });
        console.log('Address array deleted successfully!');
      } catch (error) {
        console.error('Error deleting address array:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  }

  async function addNewAddress() {
    // The connected account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // replace with the connected account
  
    // Get the value from the input text box with id "AddressAdd"
    const newAddress = document.getElementById('AddressAdd').value;
  
    const DeadNautInstance = new web3.eth.Contract(DeadNautABI, DeadNautAddress);
    
    // Use the newAddress value in the addAddress method
    DeadNautInstance.methods.addAddress(newAddress).send({ from: account })
    .then(function(receipt){
      console.log(receipt);
    });
  }

  async function addNewAddressTEST() {
    // The connected account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // replace with the connected account
  
    // Get the value from the input text box with id "AddressAdd"
    const newAddress = document.getElementById('AddressAdd').value;
  
    const DeadNautTESTInstance = new web3.eth.Contract(DeadNautABI, DeadNautTESTAddress);
    
    // Use the newAddress value in the addAddress method
    DeadNautTESTInstance.methods.addAddress(newAddress).send({ from: account })
    .then(function(receipt){
      console.log(receipt);
    });
  }

const ownerAddress = accounts[0];


async function stakeToken() {
  // Check if Web3 is injected
  if (typeof window.ethereum !== 'undefined') {
    // Create a new Web3 instance
    const web3 = new Web3(window.ethereum);

    // Request user account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Fetch the tokens of the owner
    let tokens = await LifeCardInstance.methods.tokensOfOwner(ownerAddress).call();
    
    // If owner has tokens
    if(tokens.length > 0) {
        // Use the first token for simplicity
        let tokenId = tokens[0];

        // Approve the DeadNautAddress to transfer the token
        await LifeCardInstance.methods.approve(tokenId, DeadNautAddress).send({from: ownerAddress, gasPrice: web3.utils.toWei('20', 'gwei')});

        // Stake the token
        await DeadNautInstance.methods.stake(tokenId).send({from: ownerAddress, gasPrice: web3.utils.toWei('20', 'gwei')});
    } else {
        console.log('No tokens found for this owner.');
    }
  }}

  async function stakeTokenTEST() {
    // Check if Web3 is injected
    if (typeof window.ethereum !== 'undefined') {
      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);
  
      // Request user account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Fetch the tokens of the owner
      let tokens = await LifeCardTESTInstance.methods.tokensOfOwner(ownerAddress).call();
      
      // If owner has tokens
      if(tokens.length > 0) {
          // Use the first token for simplicity
          let tokenId = tokens[0];
  
          // Approve the DeadNautAddress to transfer the token
          await LifeCardTESTInstance.methods.approve(tokenId, DeadNautTESTAddress).send({from: ownerAddress, gasPrice: web3.utils.toWei('20', 'gwei')});
  
          // Stake the token
          await DeadNautTESTInstance.methods.stake(tokenId).send({from: ownerAddress, gasPrice: web3.utils.toWei('20', 'gwei')});
      } else {
          console.log('No tokens found for this owner.');
      }
    }}

async function unstakeToken() {
    try {
        const stakeInfo = await DeadNautInstance.methods.stakes(ownerAddress).call();
        const tokenId = stakeInfo.tokenId;

        // Call the unstake function with the retrieved tokenId
        await DeadNautInstance.methods.unstake(tokenId).send({from: ownerAddress});
        console.log(`Successfully unstaked token with ID: ${tokenId}`);
    } catch (error) {
        console.error(`Failed to unstake token: ${error}`);
    }
}
async function unstakeTokenTEST() {
  try {
      const stakeInfo = await DeadNautTESTInstance.methods.stakes(ownerAddress).call();
      const tokenId = stakeInfo.tokenId;

      // Call the unstake function with the retrieved tokenId
      await DeadNautTESTInstance.methods.unstake(tokenId).send({from: ownerAddress});
      console.log(`Successfully unstaked token with ID: ${tokenId}`);
  } catch (error) {
      console.error(`Failed to unstake token: ${error}`);
  }
}
async function getBenefactorAddressArray() {
  try {
      // Fetch the value from the text input box
      let benefactor = document.getElementById("benefactor").value;
      
      // Set the Contract
      const DeadNautInstance= new web3.eth.Contract(DeadNautABI, DeadNautAddress);

      // Call the Contract function
      const result = await DeadNautInstance.methods.getbenefactorAddressArray(benefactor).call();
      
      // Log the result
      console.log(result);
      console.log(benefactor)
      return result;
  } catch (error) {
      console.error(error);
  }
}
async function getBenefactorAddressArrayTEST() {
  try {
      // Fetch the value from the text input box
      let benefactor = document.getElementById("benefactor").value;
      
      // Set the Contract
      const DeadNautInstance= new web3.eth.Contract(DeadNautABI, DeadNautAddress);

      // Call the Contract function
      const result = await DeadNautTESTInstance.methods.getbenefactorAddressArray(benefactor).call();
      
      // Log the result
      console.log(result);
      console.log(benefactor)
      return result;
  } catch (error) {
      console.error(error);
  }
}
const [benefactor, setBenefactor] = useState('');
useEffect(() => {
  async function fetchBenefactor() {
    const result = await getBenefactorAddressArray();
    setBenefactor(result,benefactor);
  }

  fetchBenefactor();
}, []);

    const handleDecrement = () => {
      if (quantity <= 1) return;
      setMintAmount(quantity - 1);
    };
  
    const handleIncrement = () => {
      if (quantity >= 100) return;
      setMintAmount(quantity + 1);
    };

    let [isUSDCAdded, setIsUSDCAdded] = useState(false);
    let [isUSDTAdded, setIsUSDTAdded] = useState(false);
    let [isDAIAdded, setIsDAIAdded] = useState(false);
    let [isWETHAdded, setIsWETHAdded] = useState(false);
    let [isLINKAdded, setIsLINKAdded] = useState(false);
    let [isWFTMAdded, setIsWFTMAdded] = useState(false);
    let [isFRAXAdded, setIsFRAXAdded] = useState(false);
    let [isCRVAdded, setIsCRVAdded] = useState(false);
    let [isYFIAdded, setIsYFIAdded] = useState(false);

    let [VMenu, setVMenu] = useState(false);
    let [TestMenu, setTestMenu] = useState(false);

    const toggleisUSDCAdded = () => {
      setIsUSDCAdded(!isUSDCAdded);
    };
    const toggleisUSDTAdded = () => {
      setIsUSDTAdded(!isUSDTAdded);
    };
    const toggleisDAIAdded = () => {
      setIsDAIAdded(!isDAIAdded);
    };
    const toggleisWETHAdded = () => {
      setIsWETHAdded(!isWETHAdded);
    };
    const toggleisLINKAdded = () => {
      setIsLINKAdded(!isLINKAdded);
    };
    const toggleisWFTMAdded = () => {
      setIsWFTMAdded(!isWFTMAdded);
    };
    const toggleisFRAXAdded = () => {
      setIsFRAXAdded(!isFRAXAdded);
    };
    const toggleisCRVAdded = () => {
      setIsCRVAdded(!isCRVAdded);
    };
    
    const toggleisYFIAdded = () => {
      setIsYFIAdded(!isYFIAdded);
    };

let [ApproveTokens, setApproveTokens] = useState([]);
let newApproveTokens = JSON.stringify(ApproveTokens);
console.log(newApproveTokens);

  async function toggleUSDC() {
    const tokenToRemove = "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75";
  
    if (!isUSDCAdded) {
      setApproveTokens([...ApproveTokens, tokenToRemove]);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== tokenToRemove));
    }
    
    setIsUSDCAdded(!isUSDCAdded);
    console.log(ApproveTokens, isUSDCAdded);
  }
  
  async function toggleUSDT() {
    if (!isUSDTAdded) {
      setApproveTokens([...ApproveTokens, "0x049d68029688eAbF473097a2fC38ef61633A3C7A"]);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0x049d68029688eAbF473097a2fC38ef61633A3C7A"));
    }
    setIsUSDTAdded(!isUSDTAdded);
    console.log(ApproveTokens, isUSDTAdded);
  }
  
  async function toggleDAI() {
    if (!isDAIAdded) {
      setApproveTokens([...ApproveTokens, "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"]);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"));
    }
    setIsDAIAdded(!isDAIAdded);
    console.log(ApproveTokens, isDAIAdded);
  }
  
  async function toggleWETH() {
    if (!isWETHAdded) {
      setApproveTokens([...ApproveTokens, "0xA59982c7A272839cBd93e02Bd8978E9a78189AB5"]);
      setIsWETHAdded(!isWETHAdded);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0xA59982c7A272839cBd93e02Bd8978E9a78189AB5"));
      setIsWETHAdded(!isWETHAdded);
    }
    console.log(ApproveTokens,isWETHAdded);
  }
  
  async function toggleLINK() {
    if (!isLINKAdded) {
      setApproveTokens([...ApproveTokens, "0x000000000000000000000"]);
      setIsLINKAdded(!isLINKAdded);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0x000000000000000000000"));
      setIsLINKAdded(!isLINKAdded);
    }
    console.log(ApproveTokens,isLINKAdded);
  }
  
  async function toggleWFTM() {
    if (!isWFTMAdded) {
      setApproveTokens([...ApproveTokens, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"]);
      setIsWFTMAdded(!isWFTMAdded);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"));
      setIsWFTMAdded(!isWFTMAdded);
    }
    console.log(ApproveTokens,isWFTMAdded);
  }
  
  async function toggleFRAX() {
    if (!isFRAXAdded) {
      setApproveTokens([...ApproveTokens, "0xaf319E5789945197e365E7f7fbFc56B130523B33"]);
      setIsFRAXAdded(!isFRAXAdded);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0xaf319E5789945197e365E7f7fbFc56B130523B33"));
      
    }
    setIsFRAXAdded(!isFRAXAdded);
    console.log(ApproveTokens,isFRAXAdded);
  }
  
  async function toggleCRV() {
    const tokenAddress = "0x1E4F97b9f9F913c46F1632781732927B9019C68b";
  
    const isTokenInArray = ApproveTokens.includes(tokenAddress);
  
    if (!isTokenInArray) {
      setApproveTokens([...ApproveTokens, tokenAddress]);
      setIsCRVAdded(true);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== tokenAddress));
      setIsCRVAdded(false);
    }
  
    console.log(ApproveTokens, isCRVAdded);
  }
  
  async function toggleYFI() {
    if (!isYFIAdded) {
      setApproveTokens([...ApproveTokens,"0x29b0Da86e484E1C0029B56e817912d778aC0EC69"]);
      setIsYFIAdded(!isYFIAdded);
    } else {
      setApproveTokens(ApproveTokens.filter(token => token !== "0x29b0Da86e484E1C0029B56e817912d778aC0EC69"));
      
    }
    setIsYFIAdded(!isYFIAdded);
    console.log(ApproveTokens,isYFIAdded);
  }
  
 
  async function payBenefactorAddresses() {
    const accounts = await web3.eth.getAccounts();
    const inputBenefactor = document.getElementById('benefactorInput').value;
    const inputToken = document.getElementById('tokenInput').value;
    const inputAmount = document.getElementById('amountInput').value;

  await DeadNautInstance.methods.paybenefactorAddresses(inputBenefactor, inputToken, inputAmount).send({from: accounts[0]});
}
async function payBenefactorAddressesTEST() {
  const accounts = await web3.eth.getAccounts();
  const inputBenefactor = document.getElementById('benefactorInput').value;
  const inputToken = document.getElementById('tokenInput').value;
  const inputAmount = document.getElementById('amountInput').value;

  await DeadNautTESTInstance.methods.paybenefactorAddresses(inputBenefactor, inputToken, inputAmount).send({from: accounts[0]});
}
  return (
    <Flex justify="" align="" height="" paddingLeft="20px"position="absolute" zIndex="1">
      <Box >
        <div/>
        
        {isConnected ? (
          
          <div>
                
      <Flex justify="" align="" position="absolute" marginLeft="128px" >
      <Grid 
      templateAreas={`"1 2 3"
                      "4 5 6 "
                      "7 8 9"`}
  gridTemplateRows={'37px 1fr 100px'}
  gridTemplateColumns={'37px 1fr 20px '}
  
  gap='2'
  color='blackAlpha.500'
  fontWeight='bold' >

  <Button
     position="right"
     fontWeight='bold'
        cursor="pointer"
        zIndex="3"
        fontFamily="inherit"
        paddingLeft="px"
        marginTop="0"
        marginLeft="0px"
        width="37px"
        bgColor={isUSDCAdded ? "#49cc3d" : "#ff5941"}
        height="37px"
        backgroundImage ={TokenButton}
        style={{ fontSize: 8}}
        onClick= {toggleUSDC}> 
          USDC 
        </Button>
          
        <Button 
        position="right"
        fontWeight='bold'
        cursor="pointer"
        zIndex="3"
        fontFamily="inherit"
        paddingLeft="px"
        bgColor={isUSDTAdded ? "#49cc3d" : "#ff5941"}
        marginTop="0"
        marginLeft="0px"
        width="37px"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleUSDT}>
          fUSDT
        </Button>
        <Button
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        zIndex="3"
        fontWeight='bold'
        bgColor={isDAIAdded ? "#49cc3d" : "#ff5941"}
        marginTop="0"
        marginLeft="0px"
        width="37px"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleDAI}>
          DAI
        </Button>
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        fontWeight='bold'
        marginTop="0"
        bgColor={isWETHAdded ? "#49cc3d" : "#ff5941"}
        marginLeft=""
        width="37px"
        zIndex="3"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleWETH}>
          WETH
        </Button>
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        marginTop="0"
        marginLeft=""
        bgColor={isLINKAdded ? "#49cc3d" : "#ff5941"}
        fontWeight='bold'
        width="37px"
        height="37px"
        zIndex="4"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleLINK}>
          N/A
        </Button>
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        marginTop="0"
        marginLeft="0px"
        bgColor={isWFTMAdded ? "#49cc3d" : "#ff5941"}
        fontWeight='bold'
        width="37px"
        height="37px"
        zIndex="2"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleWFTM}>
          WFTM
        </Button>
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        marginTop="0"
        fontWeight='bold'
        marginLeft="0px"
        bgColor={isFRAXAdded ? "#49cc3d" : "#ff5941"}
        width="37px"
        zIndex="3"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleFRAX}>
          FRAX
        </Button>
     
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        paddingLeft="px"
        fontWeight='bold'
        marginTop="0"
        zIndex="3"
        bgColor={isCRVAdded ? "#49cc3d" : "#ff5941"}
        marginLeft="0px"
        width="37px"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleCRV}>
          CRV
        </Button>
        <Button
     backgroundColor="transparent"
     position="right"
        cursor="pointer"
        fontFamily="inherit"
        fontWeight='bold'
        paddingLeft="px"
        bgColor={isYFIAdded ? "#49cc3d" : "#ff5941"}
        zIndex="3"
        marginTop="0"
        marginLeft="0px"
        width="37px"
        height="37px"
        backgroundImage= {TokenButton} 
        style={{ fontSize: 8}}
        onClick={toggleYFI}>
          YFI
        </Button>
           
           </Grid>
       
     </Flex>
         
          <Stack direction='column'marginTop="68px">
       <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        margin="0px"
        zIndex="3"
        width="101px"
        fontWeight='bold'
        height="37px"
        backgroundImage= {CButton} 
        onClick={mintTokens}
        style={{ fontSize: 10 }}
        >
        Mint LifeCard 1yr
       
      </Button>
    
      <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        fontWeight='bold'
        height="22px"
        zIndex="3"
        marginTop="152px"
        position ="absolute"
        backgroundImage= {DButton} 
        onClick={addNewAddress}
        style={{ fontSize: 5 }}
        >
        Send
       
      </Button>
      <Button
        Color="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        fontWeight='bold'
        height="22px"
        zIndex={VMenu ? 0 : 0}
        marginTop="152px"
        position ="absolute"
        backgroundImage= {DButton} 
        style={{ fontSize: 5 }}
        >
        Send
       
      </Button>
      <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        zIndex={TestMenu ? 7 : 0}
        fontWeight='bold'
        height="22px"
        marginTop="152px"
        position ="absolute"
        backgroundImage= {DButton} 
        onClick={addNewAddressTEST}
        style={{ fontSize: 5 }}
        >
        Send
       
      </Button>
      
          <Flex justify="center" align="center" position="absolute">
<Stack>
          <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="130px"
        zIndex="1"
        marginLeft= "148px"
        fontWeight='bold'
        width="75px"
        height="22px"
        backgroundImage= {AButton} 
        onClick={approveTheTokens}
        style={{ fontSize: 10 }}
        >
        Approve 
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-28px"
        zIndex={VMenu ? 0 : 0}
        marginLeft= "148px"
        fontWeight='bold'
        width="75px"
        height="22px"
        backgroundImage= {AButton} 
        onClick={approveTheTokens}
        style={{ fontSize: 10 }}
        >
        Coming Soon
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-28px"
        marginLeft= "148px"
        fontWeight='bold'
        width="75px"
        zIndex={TestMenu ? 7 : 0}
        height="22px"
        backgroundImage= {AButton} 
        onClick={approveTheTokensTEST}
        style={{ fontSize: 10 }}
        >
        Approve TEST 
      </Button>
      <Stack spacing={4} marginLeft= "128px" marginTop= "38px">
      <Input placeholder='Benefactor Address' htmlSize={14} marginLeft="1px" marginTop="0px" paddingTop="6px"id="benefactorInput"/>
      <Input placeholder='Token Address' htmlSize={14} marginLeft="1px" marginTop="0px" paddingTop="6px"id="tokenInput"/>
      <Input placeholder='Amount' htmlSize={17} marginLeft="1px" marginTop="0px" paddingTop="6px"id="amountInput" />
      </Stack>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-1px"
        zIndex="1"
        marginLeft= "149px"
        width="75px"
        fontWeight='bold'
        height="22px"
        backgroundImage= {AButton} 
        onClick={() => payBenefactorAddresses()}
        style={{ fontSize: 10 }}
        >
        Insure 
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-28px"
        zIndex={VMenu ? 0 : 0}
        marginLeft= "149px"
        width="75px"
        fontWeight='bold'
        height="22px"
        backgroundImage= {AButton}
        style={{ fontSize: 10 }}
        >
        Coming Soon
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        zIndex={TestMenu ? 7 : 0}
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-28px"
        marginLeft= "149px"
        width="75px"
        fontWeight='bold'
        height="22px"
        backgroundImage= {AButton} 
        style={{ fontSize: 10 }}
        onClick={() => payBenefactorAddressesTEST()}
        >
        Insure TEST
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="17px"
        marginLeft= "149px"
        width="75px"
        fontWeight='bold'
        height="22px"
        backgroundImage= {AButton} 
        onClick={ToggleMenuV}
        style={{ fontSize: 10 }}
        >
         LC 5 Menu
      </Button>
      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginTop="-1px"
        marginLeft= "149px"
        width="75px"
        fontWeight='bold'
        height="22px"
        backgroundImage= {AButton} 
        onClick={ToggleMenuTEST}
        style={{ fontSize: 10 }}
        >
        LC Test Menu
      </Button>
</Stack>
          </Flex>
      <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        fontWeight='bold'
        height="22px"
        zIndex="1"
        marginTop="206px"
        position ="absolute"
        onClick={getBenefactorAddressArray}
        backgroundImage= {DButton} 
        style={{ fontSize: 5 }}
        >
        send
       
      </Button>
      <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        zIndex={VMenu ? 0 : 0}
        fontWeight='bold'
        height="22px"
        marginTop="206px"
        position ="absolute"
        backgroundImage= {DButton} 
        style={{ fontSize: 5 }}
        >
        send
       
      </Button>
      <Button
        backgroundColor="transparent"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        marginLeft="102px"
        width="19px"
        zIndex={TestMenu ? 7 : 0}
        fontWeight='bold'
        height="22px"
        marginTop="206px"
        position ="absolute"
        onClick={getBenefactorAddressArrayTEST}
        backgroundImage= {DButton} 
        style={{ fontSize: 5 }}
        >
        send
       
      </Button>

      <Button
        
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        fontWeight='bold'
        marginTop="-2"
        width="101px"
        height="37px"
        backgroundImage= {CButton} 
        style={{ fontSize: 10 }}
        >
        Coming Soon
      </Button>

        <Button
        backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        fontWeight='bold'
        marginTop="-2"
        width="101px"
        height="37px"
        backgroundImage= {CButton} 
        style={{ fontSize: 10 }}
        onClick={mintTokensTEST}
        >
        Mint Test(10min)
      </Button>

    </Stack>
        
      

        <Flex justify="" align="center">
          <Button
            backgroundColor="#008fd4"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            width="19px"
            fontWeight='bold'
            height="22px"
            marginLeft="10px"
            backgroundImage= {DButton}
            style={{ fontSize: 20 }}
            onClick={handleDecrement}
          >
            {" "}
            -
          </Button>

          <Input
            readOnly
            backgroundColor="transparent"
            borderRadius="5px"
            fontFamily="inherit"
            width="35px"
            height="25px"
            margin="4px"
            paddingLeft="0px"
            zIndex="3"
            type="number"
            
            style={{ fontSize: 20 }}
            value={quantity}
          />

          <Button
            backgroundColor="#008fd4"
            color="white"
            cursor="pointer"
            fontWeight='bold'
            fontFamily="inherit"
            width="19px"
            height="22px"
            
            backgroundImage= {DButton}
            style={{ fontSize: 20 }}
            onClick={handleIncrement}
          >
            {" "}
            +
          </Button>
          
        </Flex>
        <div>
        <Input placeholder='Add Address' htmlSize={14} position="absolute" marginLeft="1px" marginTop="3px" paddingTop="2px" id="AddressAdd"/>
        </div>
        <div/>
        <Stack direction='column'>
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          marginTop="28"
          marginLeft="2px"
          width="117px"
          zIndex="1"
          height="22px"
          backgroundImage= {BButton}
          style={{ fontSize: 10 }}
          onClick={deleteAddressArray}
        >
          Delete Addresses
        </Button>
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          marginTop="-28"
          zIndex={VMenu ? 0 : 0}
          marginLeft="2px"
          width="117px"
          height="22px"
          backgroundImage= {BButton}
          style={{ fontSize: 10 }}
        >
          Coming Soon
        </Button>
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          marginTop="-28"
          marginLeft="2px"
          zIndex={TestMenu ? 7 : 0}
          width="117px"
          height="22px"
          backgroundImage= {BButton}
          style={{ fontSize: 10 }}
          onClick={deleteAddressArrayTEST}
        >
          Delete Addresses TEST
        </Button>
       
        <Input placeholder='View Address Array' htmlSize={14} position="absolute" marginLeft="1px" marginTop="56" paddingTop="2px"  id="benefactor"/>
        <Textarea isDisabled placeholder='View Address Array Output' marginTop="86" position="absolute" paddingLeft="-20px" zIndex="8" value={benefactor} />       
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          marginTop="90"
          width="101px"
          height="37px"
          zIndex="1"
          fontWeight='bold'
          backgroundImage= {CButton}
          style={{ fontSize: 10 }}
          onClick={stakeToken}
        >
          Stake
        </Button>
        <Button
          backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        margin="0"
        width="101px"
        fontWeight='bold'
        zIndex="1"
        height="37px"
        marginTop="-3px"
        backgroundImage= {CButton} 
        style={{ fontSize: 10 }}
        onClick={unstakeToken}
        >
        Unstake
        </Button>
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          zIndex={VMenu ? 0 : 0}
          marginTop="-83"
          width="101px"
          height="37px"
          fontWeight='bold'
          backgroundImage= {CButton}
          style={{ fontSize: 10 }}
        >
          Coming Soon
        </Button>
        <Button
          backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        margin="0"
        zIndex={VMenu ? 0 : 0}
        width="101px"
        fontWeight='bold'
        height="37px"
        marginTop="-3px"
        backgroundImage= {CButton} 
        style={{ fontSize: 10 }}
        >
        Coming Soon
        </Button>
        <Button
          backgroundColor="transparent"
          color="21211e"
          cursor="pointer"
          fontFamily="inherit"
          marginTop="-83"
          width="101px"
          zIndex={TestMenu ? 7 : 0}
          height="37px"
          fontWeight='bold'
          backgroundImage= {CButton}
          style={{ fontSize: 10 }}
          onClick={stakeTokenTEST}
        >
          Stake(TEST)
        </Button>
        <Button
          backgroundColor="transparent"
        color="21211e"
        cursor="pointer"
        fontFamily="inherit"
        padding="0px"
        margin="0"
        zIndex={TestMenu ? 7 : 0}
        width="101px"
        fontWeight='bold'
        height="37px"
        marginTop="-3px"
        backgroundImage= {CButton} 
        style={{ fontSize: 10 }}
        onClick={unstakeTokenTEST}
        >
        Unstake(TEST)
        </Button>
        </Stack>
     
          </div>
        ) : (
          
          <Text
          justify= "right"
          align="right"
            marginTop="100px"
            marginLeft = "-20px"
            fontSize="25px"
            letterSpacing=""
            fontFamily="VT323"
            textShadow="0 1px #000000"
            color="#d92f63"
          >
            Connect your wallet to mint.
          </Text>
        )}
      </Box>
    </Flex>
  )
} 

export default DeadNaut;
