import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer, Img} from '@chakra-ui/react';

import GUI from "./DNGUI.png";

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        setAccounts(accounts);
        }
    }

    return(
       
        

        <Flex justify="center" align="center"  margin="0" position="absolute" >
        
            
            <Box boxSize='auto' height="center"     >
                <Image src={GUI} />
                
            </Box>
           
            {/*Right Side - Sections and Connect*/}
            <Flex>
            <Box margin="0 0px"></Box>
            
           
            
      

            {/*Connect*/}
            { isConnected ? (
                <Box position="absolute" marginLeft="-200px" marginTop= "-180px">Connected</Box>
            ) : (
                <Button 
                backgroundColor="#008fd4"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="0px"
                marginLeft="-100px"
                width="100px"
                height="40"
                position="absolute"
                onClick={connectAccount}>Connect</Button>
            ) }
        </Flex>
</Flex>




    );
};

export default NavBar;