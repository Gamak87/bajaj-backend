const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

function separateData(data) {
    const nums = [];
    const alps = [];
    let highestAlpha = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            nums.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /^[A-Za-z]$/.test(item)) {
            alps.push(item);
            if (!highestAlpha || item.toLowerCase() > highestAlpha.toLowerCase()) {
                highestAlpha = item;
            }
        }
    });

    return { nums, alps, highestAlpha: highestAlpha ? [highestAlpha] : [] };
}


app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input data' });
    }

    const { nums, alps, highestAlpha } = separateData(data);

    res.json({
        is_success: true,
        user_id: "Gamak Sahani",
        email: "gamak.sahani2021@vitstudent.ac.in",
        roll_number: "21BCE0889",
        numbers: nums,
        alphabets: alps,
        highest_alphabet: highestAlpha
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
