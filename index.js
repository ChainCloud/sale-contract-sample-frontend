var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { Receipt } = require('rt-sale-lib');
var app = express();

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


app.use('/', router);

var port = process.env.PORT || 3000;
var server = app.listen(port, ()=> {
	console.log('Express server listening on port ' + port);
});

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});


router.post('/getReceipt', async(req, res) => {
	var crowdsaleAddress = req.body.crowdsaleAddress;
	var dealIndex = req.body.dealIndex;
	var affiliateAddress = req.body.affiliateAddress;
	var purchaserAddress = req.body.purchaserAddress;
	var investorAddress = req.body.investorAddress;
	var orderId = req.body.orderId;
	var signerPrivateKey = req.body.signerPrivateKey;
	var referenceHash = req.body.referenceHash;
	var timestamp = req.body.timestamp;

	const investReceipt = await  new Receipt(crowdsaleAddress).investment(investorAddress, referenceHash, 0, orderId, timestamp).sign(signerPrivateKey);
	const receiptParams = await Receipt.parseToParams(investReceipt);

	res.json(receiptParams);
});