const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOOD:   Symbol("food"),
    EXTRAS:  Symbol("extras"),
    PAYMENT: Symbol("payment")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sExtras = "";
        this.sAmount = 0;
        this.sTotal = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.FOOD;
                aReturn.push("Welcome to Home Hardware @Curbside.");
                aReturn.push(`For a list of what we sell tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Press '1' for Brooms and Dustbins");
                aReturn.push("Press '2' for Light-bulbs");
                aReturn.push("Press '3' for Snow Showel");
                aReturn.push("Press '4' for Furnace Filters");
                aReturn.push("Press '5' for Household cleaners");
                aReturn.push("Please enter the Item Number");
                this.sType = sInput;
                break;
            case OrderState.FOOD:

                if(sInput == "1"){
                    this.sItem = "Brooms and Dustbins";
                    this.sAmount += 4.99;
                    aReturn.push("Would you like a any Upsell Item for $2 Only");
                    aReturn.push("Simonize car cloths or Geeky headlamps or Ear-buds or NO?");                    
                    this.stateCur = OrderState.EXTRAS;
                }
                else if(sInput == "2"){
                    this.sItem = "Light-bulbs";
                    this.sAmount += 3.99;
                    aReturn.push("Would you like a any Upsell Item for $2 Only");
                    aReturn.push("Simonize car cloths or Geeky headlamps or Ear-buds or NO?");
                    this.stateCur = OrderState.EXTRAS;
                }
                else if(sInput == "3"){
                    this.sItem = "Snow Showel";
                    this.sAmount += 5.99;
                    aReturn.push("Would you like a any Upsell Item for $2 Only");
                    aReturn.push("Simonize car cloths or Geeky headlamps or Ear-buds or NO?");
                    this.stateCur = OrderState.EXTRAS;
                }
                else if(sInput == "4"){
                    this.sItem = "Furnace Filters";
                    this.sAmount += 8.99;
                    aReturn.push("Would you like a any Upsell Item for $2 Only");
                    aReturn.push("Simonize car cloths or Geeky headlamps or Ear-buds or NO?");
                    this.stateCur = OrderState.EXTRAS;
                }
                else if(sInput == "5"){
                    this.sItem = "Household cleaners";
                    this.sAmount += 12.99;
                    aReturn.push("Would you like a any Upsell Item for $2 Only");
                    aReturn.push("Simonize car cloths or Geeky headlamps or Ear-buds or NO?");
                    this.stateCur = OrderState.EXTRAS;
                }               
                else {
                    aReturn.push("Error: Invalid Item Number");
                    this.stateCur = OrderState.WELCOMING;
                }
                break;
                
            case OrderState.EXTRAS:
                this.stateCur = OrderState.PAYMENT;
                if(sInput.toLowerCase() != "no"){
                    this.sExtras = sInput;
                    this.sAmount += 2;
                }
                else{
                    this.sExtras = "";
                    this.sAmount += 0;
                }
                this.sTotal = this.sAmount*0.13 + this.sAmount;
                this.sTotal = Math.fround(this.sTotal).toFixed(2);
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sItem}`);
                if(this.sExtras){
                  aReturn.push(`Up Sell Item is ${this.sExtras}`);
                }
                aReturn.push(`Ontario 13% Tax have been added to your amount of $${this.sAmount}`);
                aReturn.push(`Your total comes to $${this.sTotal} including Tax`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`)
                this.isDone(true);
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c3 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 234pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c1 {
            color: #000000;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c0 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left;
            height: 11pt
        }

        .c4 {
            color: #000000;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c11 {
            color: #000000;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 14pt;
            font-family: "Arial";
            font-style: normal
        }

        .c12 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: center
        }

        .c8 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c6 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c9 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: right
        }

        .c5 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: left
        }

        .c10 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: center
        }

        .c13 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c2 {
            height: 0pt
        }

        .c7 {
            font-weight: 700
        }

        .c14 {
            height: 11pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c13">
    <p class="c12"><span class="c7 c11">Welcome to Home Hardware (Curbside Pickup)</span></p>
    <p class="c12 c14"><span class="c4"></span></p>
    <p class="c0"><span class="c1"></span></p>
    <p class="c8"><span class="c1">Price List here</span></p>
    <p class="c0"><span class="c1"></span></p><a id="t.0693fb74738a3d2a9d1788da30d74791148ac61a"></a><a id="t.0"></a>
    <table class="c6">
        <tbody>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c10"><span class="c4">ITEM</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c10"><span class="c4">PRICE</span></p>
                </td>
            </tr>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Brooms and dustbins</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c9"><span class="c1">$4.99</span></p>
                </td>
            </tr>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Light-bulbs</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c9"><span class="c1">$3.99</span></p>
                </td>
            </tr>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Snow Shovel</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c9"><span class="c1">$5.99</span></p>
                </td>
            </tr>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Furnace Filters</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c9"><span class="c1">$8.99</span></p>
                </td>
            </tr>
            <tr class="c2">
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c5"><span class="c1">Household cleaners</span></p>
                </td>
                <td class="c3" colspan="1" rowspan="1">
                    <p class="c9"><span class="c1">$12.99</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p class="c0"><span class="c1"></span></p>
    <p class="c0"><span class="c1"></span></p>
    <p class="c8"><span class="c7">We also have a few up-sell items for $2 Only</span><span class="c1">. i.e. </span>
    </p>
    <p class="c8"><span class="c1">Simonize car cloths, Geeky headlamps, Ear-buds and De-scaler for a kettle. </span>
    </p>
</body>

</html>      `);
  
    }
}
