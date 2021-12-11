const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
 
    // const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // const waveContract = await waveContractFactory.deploy();
    // await waveContract.deployed();
  
    // console.log("Contract deployed to:", waveContract.address);

    // console.log("Contract deployed by:", owner.address);

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    
    // let waveTxn = await waveContract.wave();
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    // //for multiplayer (other people can hit our functions)
    // waveTxn = await waveContract.connect(randomPerson).wave();
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    //const waveContract = await waveContractFactory.deploy();
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    }); //The magic is on hre.ethers.utils.parseEther('0.1'),. 
    //This is where I say, "go and deploy my contract and 
    //fund it with 0.1 ETH". 
    //This will remove ETH from my wallet, and use it 
    //to fund the contract. 
    
    await waveContract.deployed();
    console.log('Contract addy:', waveContract.address);


    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    /*
    * Send Wave
    */
    // let waveTxn = await waveContract.wave('A message!');
    // await waveTxn.wait();

    /*
    * Let's try two waves now
    */
    const waveTxn = await waveContract.wave('This is wave #1');
    await waveTxn.wait();


    const waveTxn2 = await waveContract.wave('This is wave #2');
    await waveTxn2.wait();


    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
  


    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    // /**
    //  * Let's send a few waves!
    //  */
    // let waveTxn = await waveContract.wave('A message!');
    // await waveTxn.wait(); // Wait for the transaction to be mined

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
    // await waveTxn.wait(); // Wait for the transaction to be mined

    // let allWaves = await waveContract.getAllWaves();
    // console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();