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
        break;
      }
    }

    node_coefficient_rules.forEach((rule) => {
      if (result.match(rule)) {
        result = result.replace(rule, "$1×");
        return;
      }
    });

    /**
     * 1->01
     * 2->02
     * ...
     * 10->10
     * 11->11
     */
    if (!result.match(number_rules[0])) {
      result = result.replace(number_rules[1], "0$1 ");
    }
    proxy.name =
      name + " " + result.replaceAll("-", " ").replaceAll(/\s+/g, " ");
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
const number_rules = [
  new RegExp("(\\d{2})(?!X|x)"),
  new RegExp("(\\d)(?!X|x)"),
];

const node_coefficient_rules = [
  new RegExp(/\[((\d+\.\d+)|.*(\d+))X\]/),
  new RegExp("(\\d+\\.\\d+)x"),
];
