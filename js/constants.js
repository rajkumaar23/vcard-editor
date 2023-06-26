const USER_ICON = "data:image/png;base64,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";
const PHONE_CODE_MAP = JSON.parse("{\"Afghanistan\":\"93\",\"Albania\":\"355\",\"Algeria\":\"213\",\"American Samoa\":\"1\",\"Andorra\":\"376\",\"Angola\":\"244\",\"Anguilla\":\"1\",\"Antigua and Barbuda\":\"1\",\"Argentina\":\"54\",\"Armenia\":\"374\",\"Aruba\":\"297\",\"Australia\":\"61\",\"Austria\":\"43\",\"Azerbaijan\":\"994\",\"Bahamas\":\"1\",\"Bahrain\":\"973\",\"Bangladesh\":\"880\",\"Barbados\":\"1\",\"Belarus\":\"375\",\"Belgium\":\"32\",\"Belize\":\"501\",\"Benin\":\"229\",\"Bermuda\":\"1\",\"Bhutan\":\"975\",\"Bolivia\":\"591\",\"Bosnia and Herzegovina\":\"387\",\"Botswana\":\"267\",\"Brazil\":\"55\",\"British Virgin Islands\":\"1\",\"Brunei Darussalam\":\"673\",\"Bulgaria\":\"359\",\"Burkina Faso\":\"226\",\"Burundi\":\"257\",\"Cambodia\":\"855\",\"Cameroon\":\"237\",\"Canada\":\"1\",\"Cape Verde\":\"238\",\"Central African Republic\":\"236\",\"Chad\":\"235\",\"Chile\":\"56\",\"China\":\"86\",\"Hong Kong\":\"852\",\"Macao\":\"853\",\"Colombia\":\"57\",\"Comoros\":\"269\",\"Congo\":\"242\",\"Costa Rica\":\"506\",\"Côte d'Ivoire\":\"225\",\"Croatia\":\"385\",\"Cuba\":\"53\",\"Cyprus\":\"357\",\"Czech Republic\":\"420\",\"Denmark\":\"45\",\"Djibouti\":\"253\",\"Dominica\":\"1\",\"Dominican Republic\":\"1\",\"Ecuador\":\"593\",\"Egypt\":\"20\",\"El Salvador\":\"503\",\"Equatorial Guinea\":\"240\",\"Eritrea\":\"291\",\"Estonia\":\"372\",\"Ethiopia\":\"251\",\"Faroe Islands\":\"298\",\"Fiji\":\"679\",\"Finland\":\"358\",\"France\":\"33\",\"French Guiana\":\"594\",\"French Polynesia\":\"689\",\"Gabon\":\"241\",\"Gambia\":\"220\",\"Georgia\":\"995\",\"Germany\":\"49\",\"Ghana\":\"233\",\"Greece\":\"30\",\"Greenland\":\"299\",\"Grenada\":\"1\",\"Guadeloupe\":\"590\",\"Guam\":\"1\",\"Guatemala\":\"502\",\"Guinea-Bissau\":\"245\",\"Haiti\":\"509\",\"Honduras\":\"504\",\"Hungry\":\"36\",\"Iceland\":\"354\",\"India\":\"91\",\"Indonesia\":\"62\",\"Iran (Islamic Republic of)\":\"98\",\"Iraq\":\"964\",\"Ireland\":\"353\",\"Israel\":\"972\",\"Italy\":\"39\",\"Japan\":\"81\",\"Jordan\":\"962\",\"Kazakhstan\":\"7\",\"Kenya\":\"254\",\"Kiribati\":\"686\",\"Korea\":\"82\",\"Kuwait\":\"965\",\"Kyrgyzstan\":\"996\",\"Lao PDR\":\"856\",\"Latvia\":\"371\",\"Lebanon\":\"961\",\"Lesotho\":\"266\",\"Liberia\":\"231\",\"Libya\":\"218\",\"Liechtenstein\":\"423\",\"Lithuania\":\"370\",\"Luxembourg\":\"352\",\"Madagascar\":\"261\",\"Malawi\":\"265\",\"Malaysia\":\"60\",\"Maldives\":\"960\",\"Mali\":\"223\",\"Malta\":\"356\",\"Marshall Islands\":\"692\",\"Martinique\":\"596\",\"Mauritania\":\"222\",\"Mauritius\":\"230\",\"Mexico\":\"52\",\"Micronesia, Federated States of\":\"691\",\"Moldova\":\"373\",\"Monaco\":\"377\",\"Mongolia\":\"976\",\"Montenegro\":\"382\",\"Montserrat\":\"1\",\"Morocco\":\"212\",\"Mozambique\":\"258\",\"Myanmar\":\"95\",\"Namibia\":\"264\",\"Nauru\":\"674\",\"Nepal\":\"977\",\"Netherlands\":\"31\",\"New Caledonia\":\"687\",\"New Zealand\":\"64\",\"Nicaragua\":\"505\",\"Niger\":\"227\",\"Nigeria\":\"234\",\"Northern Mariana Islands\":\"1\",\"Norway\":\"47\",\"Oman\":\"968\",\"Pakistan\":\"92\",\"Palau\":\"680\",\"Palestinian Territory\":\"970\",\"Panama\":\"507\",\"Papua New Guinea\":\"675\",\"Paraguay\":\"595\",\"Peru\":\"51\",\"Philippines\":\"63\",\"Poland\":\"48\",\"Portugal\":\"351\",\"Puerto Rico\":\"1\",\"Qatar\":\"974\",\"Réunion\":\"262\",\"Romania\":\"40\",\"Russian Federation\":\"7\",\"Rwanda\":\"250\",\"Saint Kitts and Nevis\":\"1\",\"Saint Lucia\":\"1\",\"Saint Vincent and Grenadines\":\"1\",\"Samoa\":\"685\",\"San Marino\":\"378\",\"Sao Tome and Principe\":\"239\",\"Saudi Arabia\":\"966\",\"Senegal\":\"221\",\"Serbia\":\"381\",\"Seychelles\":\"248\",\"Sierra Leone\":\"232\",\"Singapore\":\"65\",\"Slovakia\":\"421\",\"Slovenia\":\"386\",\"Solomon Islands\":\"677\",\"Somalia\":\"252\",\"South Africa\":\"27\",\"Spain\":\"34\",\"Sri Lanka\":\"94\",\"Sudan\":\"249\",\"Suriname\":\"597\",\"Swaziland\":\"268\",\"Sweden\":\"46\",\"Switzerland\":\"41\",\"Syrian Arab Republic\":\"963\",\"Taiwan (Province of China)\":\"886\",\"Tajikistan\":\"992\",\"Tanzania\":\"255\",\"Thailand\":\"66\",\"Timor-Leste\":\"670\",\"Togo\":\"228\",\"Tonga\":\"676\",\"Trinidad and Tobago\":\"1\",\"Tunisia\":\"216\",\"Turkey\":\"90\",\"Turkmenistan\":\"993\",\"Tuvalu\":\"688\",\"Uganda\":\"256\",\"Ukraine\":\"380\",\"United Arab Emirates\":\"971\",\"United Kingdom\":\"44\",\"United States of America\":\"1\",\"Uruguay\":\"598\",\"Uzbekistan\":\"998\",\"Vanuatu\":\"678\",\"Venezuela\":\"58\",\"Viet Nam\":\"84\",\"Virgin Islands, US\":\"1\",\"Yemen\":\"967\",\"Zambia\":\"260\",\"Zimbabwe\":\"263\"}");

export {
    USER_ICON,
    PHONE_CODE_MAP
}
