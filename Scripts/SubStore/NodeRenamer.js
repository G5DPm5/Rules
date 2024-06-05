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

    name_optimization.forEach((rule) => {
      result.replaceAll(new RegExp(rule["previous"], "g"), rule["current"]);
    });

    proxy.name = result;
  });

  return proxies;
}
// Country Name
const country_name = {
  HKG: ["(🇭🇰\\s)?(香港|Hong\\sKong|HKG?)", "🇭🇰"],
  TWN: ["(🇹🇼\\s)?(台湾|Taiwan|TWN?)", "🇹🇼"],
  SGP: ["(🇸🇬\\s)?(新加坡|Singapore|SGP?)", "🇸🇬"],
  IND: ["(🇮🇳\\s)?(印度|India|IND?)", "🇮🇳"],
  USA: ["(🇺🇸\\s)?(美国|United\\sStates|USA?)", "🇺🇸"],
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
  new RegExp("(\\d+\\.\\d+)(x|X)"),
];

const name_optimization = [
  {
    previous: "-(Media)?",
    current: " ",
  },
  {
    previous: "\\s+",
    current: " ",
  },
  {
    previous: "misaka",
    current: "Misaka",
  },
  {
    previous: "T\\smobile",
    current: "T-mobile",
  },
];
