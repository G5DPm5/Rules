function operator(proxies = [], targetPlatform, context) {
  const name = $arguments.name;
  proxies.forEach((proxy = { name }) => {
    let result = proxy.name;

    /**
     * [flag] US -> [flag]
     * [flag] DE -> [flag]
     * [flag] SG -> [flag]
     */
    for (const key in country_name) {
      const reg = new RegExp(country_name[key][0]);

      if (result.match(reg)) {
        result = result.replace(reg, country_name[key][1] + " ");
        // console.log(result);
        break;
      }
    }

    if (result.match(node_info)) {
      result = result.replace(node_info, "$1×");
    }

    /**
     * 1->01
     * 2->02
     * ...
     * 10->10
     * 11->11
     */
    if (!result.match(number_regular[0])) {
      result = result.replace(number_regular[1], "0$1");
      console.log(result);
    }

    proxy.name = name + result;
  });

  return proxies;
}
// Country Name
const country_name = {
  USA: ["(🇺🇸\\s)?(美国|United\\sStates|USA?)", "🇺🇸"],
  SGP: ["(🇸🇬\\s)?(新加坡|Singapore|SGP?)", "🇸🇬"],
  DEU: ["(🇩🇪\\s)?(德国|Germany|DEU?)", "🇩🇪"],
  TUR: ["(🇹🇷\\s)?(土耳其|Turkey|Türkiye|TU?R)", "🇹🇷"],
};
// Number 1->01 11->11
const number_regular = [
  new RegExp("(\\d{2})-?(?!X)"),
  new RegExp("(\\d)-?(?!X)"),
];

const node_info = new RegExp("\\[.*(\\d+(\\.\\d+)?)X\\]");
