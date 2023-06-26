const USER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAENUlEQVR4nO2bT2hcRRzHJ9pYsFVQ6KHizdqLR0HwUApqwZCZ4sG9NGbnF5U9VIMnUZuZPiiUJjOrkKN6ag9t8Z73tr3sQQ8JhGgK4sGk3lSMVcEWu6Xwk9k1UYy2Tfr2/WYzvw98Ydk/b9/v+3u/35v35o0QDMMwDMMwDMMwDMNECF4efRpb6m0s5AUs1JeYq2uYy1s9qWtYyKXeZ/Kt8F3q/d0R4GJjGOdG65irBSwUbk1yvvvbxcYwdRwDCeZSYaFWt278pkSsYEtJ6ngGBmzX9mKuzt2/8f9S2Ga7tpc6vqjBy0efwEJeKd38v6vhSvgP6jjjNT+XV/tn/nolyKuchP9qO0U/j/xNlbDM7eifCcj70PPv4ZxQaYnHCs7JkcrNX1fqoyMM4/xShprbbkUr2D68S6QK5krTmb+RhHGRKritK9zSEzAvUgTnRg7Sm79xLjggUqN3Y01hFMrlcZEamMvzESXgvEgNzNVX5MZvSC6J1MBc/kxv/IbWRGpgITsRVUBHpAYngBhuQcTwSZgYHoYSwxdiMTxmUlCPfhK+FRFAvhlHngBNfvQnfTt6MUzIyBUy83P5bdITMgFsqZcJe3/aU5Lr8KR8HI+lLFfY95fx0pE91HGn+WBWoVb5waw7JaHoZyXIZTb/bpXQ5odzowBbSpYyRA1DzeLoKHU8Awm2D+/qLrIIiy22u0Aj9XF+WWBLHeguP+otQ1rqzSeEWTXZ+et1b4lSLo9j/spT1PvLMAzDMAzDDCSNLHu4fmL6uQnjXgPrT2njL2rj5rVxX4Px34H1v2jrbgWF1+G98FnvO/5i9zcnm2NhG2Fb1PFETy3LHoIp/0LXOOs+B+M7YD2WIuM73W1afyr8R/gv6nijQdvms2DcrLb+p9IMv2tC3K9g3LmJKfeSEDgkUiO0BD3lJrVxq5WZ/j8K+xD2JYk2NZbNPgrGZdq4NWrjYXMi1rT1J19/d+YRsfPAobpxdTD+B2qj4R4SAab5Tq322YNiJ1A308+A9QvUxsLWtRD2XQwuOKRts6GNvxGBmbgtGf8HGP9elmUPiEHijezDx8H6S+QG2nKkjWsde//MY2IQGM+aB8G4b6hNg/K1En1LAjtzSFv/WwRmYV8qoRvbzCERI9o2X9TG/U5tEvQ7CcbfqFs/IqIz37qb1OZAVTK+E00Sxq17Hqy7Tm6KrVrueoid1PyxEx/tB+u+pzfDk0hb9+Ob2fSTJOY3Gh8Pg/FfUJsA1Ekwbn5ycnZ35QkA4z+hDh7i0dlKzZ8w/tUIgsaYFDyp7Co39D7qgCHCm3gTH5ze1/cEaOs+pQ4WIlXwpu8JAOtuUwcK0crdriAB1EH6qMUJsJwA8qMQuALojQBuQfRmAIH4HGA5AeRHIXAF0BsB3ILozQAC8TnAcgLIj0LYyRXAMAzDMAzDMAzDMAzDiEHlT7mub3pfDOgRAAAAAElFTkSuQmCC";
const PHONE_CODE_MAP = JSON.parse("{\"Afghanistan\":\"93\",\"Albania\":\"355\",\"Algeria\":\"213\",\"American Samoa\":\"1\",\"Andorra\":\"376\",\"Angola\":\"244\",\"Anguilla\":\"1\",\"Antigua and Barbuda\":\"1\",\"Argentina\":\"54\",\"Armenia\":\"374\",\"Aruba\":\"297\",\"Australia\":\"61\",\"Austria\":\"43\",\"Azerbaijan\":\"994\",\"Bahamas\":\"1\",\"Bahrain\":\"973\",\"Bangladesh\":\"880\",\"Barbados\":\"1\",\"Belarus\":\"375\",\"Belgium\":\"32\",\"Belize\":\"501\",\"Benin\":\"229\",\"Bermuda\":\"1\",\"Bhutan\":\"975\",\"Bolivia\":\"591\",\"Bosnia and Herzegovina\":\"387\",\"Botswana\":\"267\",\"Brazil\":\"55\",\"British Virgin Islands\":\"1\",\"Brunei Darussalam\":\"673\",\"Bulgaria\":\"359\",\"Burkina Faso\":\"226\",\"Burundi\":\"257\",\"Cambodia\":\"855\",\"Cameroon\":\"237\",\"Canada\":\"1\",\"Cape Verde\":\"238\",\"Central African Republic\":\"236\",\"Chad\":\"235\",\"Chile\":\"56\",\"China\":\"86\",\"Hong Kong\":\"852\",\"Macao\":\"853\",\"Colombia\":\"57\",\"Comoros\":\"269\",\"Congo\":\"242\",\"Costa Rica\":\"506\",\"Côte d'Ivoire\":\"225\",\"Croatia\":\"385\",\"Cuba\":\"53\",\"Cyprus\":\"357\",\"Czech Republic\":\"420\",\"Denmark\":\"45\",\"Djibouti\":\"253\",\"Dominica\":\"1\",\"Dominican Republic\":\"1\",\"Ecuador\":\"593\",\"Egypt\":\"20\",\"El Salvador\":\"503\",\"Equatorial Guinea\":\"240\",\"Eritrea\":\"291\",\"Estonia\":\"372\",\"Ethiopia\":\"251\",\"Faroe Islands\":\"298\",\"Fiji\":\"679\",\"Finland\":\"358\",\"France\":\"33\",\"French Guiana\":\"594\",\"French Polynesia\":\"689\",\"Gabon\":\"241\",\"Gambia\":\"220\",\"Georgia\":\"995\",\"Germany\":\"49\",\"Ghana\":\"233\",\"Greece\":\"30\",\"Greenland\":\"299\",\"Grenada\":\"1\",\"Guadeloupe\":\"590\",\"Guam\":\"1\",\"Guatemala\":\"502\",\"Guinea-Bissau\":\"245\",\"Haiti\":\"509\",\"Honduras\":\"504\",\"Hungry\":\"36\",\"Iceland\":\"354\",\"India\":\"91\",\"Indonesia\":\"62\",\"Iran (Islamic Republic of)\":\"98\",\"Iraq\":\"964\",\"Ireland\":\"353\",\"Israel\":\"972\",\"Italy\":\"39\",\"Japan\":\"81\",\"Jordan\":\"962\",\"Kazakhstan\":\"7\",\"Kenya\":\"254\",\"Kiribati\":\"686\",\"Korea\":\"82\",\"Kuwait\":\"965\",\"Kyrgyzstan\":\"996\",\"Lao PDR\":\"856\",\"Latvia\":\"371\",\"Lebanon\":\"961\",\"Lesotho\":\"266\",\"Liberia\":\"231\",\"Libya\":\"218\",\"Liechtenstein\":\"423\",\"Lithuania\":\"370\",\"Luxembourg\":\"352\",\"Madagascar\":\"261\",\"Malawi\":\"265\",\"Malaysia\":\"60\",\"Maldives\":\"960\",\"Mali\":\"223\",\"Malta\":\"356\",\"Marshall Islands\":\"692\",\"Martinique\":\"596\",\"Mauritania\":\"222\",\"Mauritius\":\"230\",\"Mexico\":\"52\",\"Micronesia, Federated States of\":\"691\",\"Moldova\":\"373\",\"Monaco\":\"377\",\"Mongolia\":\"976\",\"Montenegro\":\"382\",\"Montserrat\":\"1\",\"Morocco\":\"212\",\"Mozambique\":\"258\",\"Myanmar\":\"95\",\"Namibia\":\"264\",\"Nauru\":\"674\",\"Nepal\":\"977\",\"Netherlands\":\"31\",\"New Caledonia\":\"687\",\"New Zealand\":\"64\",\"Nicaragua\":\"505\",\"Niger\":\"227\",\"Nigeria\":\"234\",\"Northern Mariana Islands\":\"1\",\"Norway\":\"47\",\"Oman\":\"968\",\"Pakistan\":\"92\",\"Palau\":\"680\",\"Palestinian Territory\":\"970\",\"Panama\":\"507\",\"Papua New Guinea\":\"675\",\"Paraguay\":\"595\",\"Peru\":\"51\",\"Philippines\":\"63\",\"Poland\":\"48\",\"Portugal\":\"351\",\"Puerto Rico\":\"1\",\"Qatar\":\"974\",\"Réunion\":\"262\",\"Romania\":\"40\",\"Russian Federation\":\"7\",\"Rwanda\":\"250\",\"Saint Kitts and Nevis\":\"1\",\"Saint Lucia\":\"1\",\"Saint Vincent and Grenadines\":\"1\",\"Samoa\":\"685\",\"San Marino\":\"378\",\"Sao Tome and Principe\":\"239\",\"Saudi Arabia\":\"966\",\"Senegal\":\"221\",\"Serbia\":\"381\",\"Seychelles\":\"248\",\"Sierra Leone\":\"232\",\"Singapore\":\"65\",\"Slovakia\":\"421\",\"Slovenia\":\"386\",\"Solomon Islands\":\"677\",\"Somalia\":\"252\",\"South Africa\":\"27\",\"Spain\":\"34\",\"Sri Lanka\":\"94\",\"Sudan\":\"249\",\"Suriname\":\"597\",\"Swaziland\":\"268\",\"Sweden\":\"46\",\"Switzerland\":\"41\",\"Syrian Arab Republic\":\"963\",\"Taiwan (Province of China)\":\"886\",\"Tajikistan\":\"992\",\"Tanzania\":\"255\",\"Thailand\":\"66\",\"Timor-Leste\":\"670\",\"Togo\":\"228\",\"Tonga\":\"676\",\"Trinidad and Tobago\":\"1\",\"Tunisia\":\"216\",\"Turkey\":\"90\",\"Turkmenistan\":\"993\",\"Tuvalu\":\"688\",\"Uganda\":\"256\",\"Ukraine\":\"380\",\"United Arab Emirates\":\"971\",\"United Kingdom\":\"44\",\"United States of America\":\"1\",\"Uruguay\":\"598\",\"Uzbekistan\":\"998\",\"Vanuatu\":\"678\",\"Venezuela\":\"58\",\"Viet Nam\":\"84\",\"Virgin Islands, US\":\"1\",\"Yemen\":\"967\",\"Zambia\":\"260\",\"Zimbabwe\":\"263\"}");

export {
    USER_ICON,
    PHONE_CODE_MAP
}
