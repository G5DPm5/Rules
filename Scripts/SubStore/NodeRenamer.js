function operator(proxies = [], targetPlatform, context) {
  proxies = nodes_filter(proxies);

  const name = $arguments.name;
  proxies.forEach((proxy = { name }) => {
    let result = proxy.name;

    /**
     * [flag] US -> [flag]
     */
    for (const key in country_name) {
      const reg = new RegExp(country_name[key][0]);

      if (result.match(reg)) {
        result = result.replace(reg, country_name[key][1] + " ");
        break;
      }
    }

    /**
     * 1->01
     * ...
     * 10->10
     * ...
     */
    if (!result.match(number_rules[0])) {
      result = result.replace(number_rules[1], "0$1 ");
    }

    node_coefficient_rules.forEach((rule) => {
      if (result.match(rule)) {
        result = result.replace(rule, "$1×").replace(/\.?0+×/, "×");
        return;
      }
    });

    name_optimization.forEach((rule) => {
      result = result.replaceAll(rule["previous"], rule["current"]);
    });

    proxy.name = name + " " + result;
  });

  return proxies;
}

function nodes_filter(proxies = []) {
  const reg = /剩余|到期|电报|流量/;
  proxies = proxies.filter((proxy) => {
    if (!reg.test(proxy.name)) {
      return true;
    }
    return false;
  });

  return proxies;
}
// Country Name
const country_name = {
  HKG: ["(🇭🇰\\s)?(香港|Hong\\sKong|HKG?)", "🇭🇰"],
  TWN: ["((🇹🇼|🇨🇳)\\s)?(台湾|Taiwan|TWN?)", "🇹🇼"],
  SGP: ["(🇸🇬\\s)?(新加坡|Singapore|SGP?)", "🇸🇬"],
  IND: ["(🇮🇳\\s)?(印度|India|IND?)", "🇮🇳"],
  IDN: ["(🇮🇩\\s)?(印度尼西亚|印尼|Indonesia|IDN?)", "🇮🇩"],
  PHL: ["(🇵🇭\\s)?(菲律宾|Philippines|PHL?)", "🇵🇭"],
  MYS: ["(🇲🇾\\s)?(马来西亚|Malaysia|MYS?)", "🇲🇾"],
  MAC: ["(🇲🇴\\s)?(澳门|Macao|MAC|MO)", "🇲🇴"],
  THA: ["(🇹🇭\\s)?(泰国|Thailand|THA?)", "🇹🇭"],
  USA: ["(🇺🇸\\s)?(美国|United\\sStates|USA?)", "🇺🇸"],
  DEU: ["(🇩🇪\\s)?(德国|Germany|DEU?)", "🇩🇪"],
  TUR: ["(🇹🇷\\s)?(土耳其|Turkey|Türkiye|TU?R)", "🇹🇷"],
};
// Number 1->01 11->11
const number_rules = [
  new RegExp("(\\d{2})(?!.*(X|x|\\.|×))"),
  new RegExp("(\\d)(?!.*(X|x|\\.|×))"),
];

const node_coefficient_rules = [
  new RegExp(/\[((\d+\.\d+)|.*(\d+))(X|x)\]/),
  new RegExp("(\\d+\\.\\d+)(x|X)"),
];

const name_optimization = [
  {
    previous: /\-/g,
    current: " ",
  },
  {
    previous: /\s+/g,
    current: " ",
  },
  {
    previous: /misaka/g,
    current: "Misaka",
  },
  {
    previous: /T\smobile/g,
    current: "T-mobile",
  },
  {
    previous: /Media/g,
    current: "",
  },
];
