function operator(proxies = [], targetPlatform, context) {
  proxies = nodes_filter(proxies);

  const name = $arguments.name + " ";
  proxies.forEach((proxy = { name: "" }) => {
    let result = proxy.name;

    result = country_name_optimization(result);

    result = node_order_optimization(result);

    result = node_coefficient_optimization(result);

    name_optimization.forEach((rule) => {
      result = result.replaceAll(rule["previous"], rule["current"]);
    });

    proxy.name = name + result;
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

function country_name_optimization(name = "") {
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

  for (const key in country_name) {
    const reg = new RegExp(country_name[key][0]);

    if (name.match(reg)) {
      name = name.replace(reg, country_name[key][1] + " ");
      break;
    }
  }

  return name;
}

function node_order_optimization(name = "") {
  // Number 1->01 11->11
  const number_rules = [/(\d{2})(?!.*(X|x\\.|×))/, /(\d)(?!.*(X|x\\.|×))/];

  if (!name.match(number_rules[0])) {
    name = name.replace(number_rules[1], "0$1 ");
  }
  return name;
}

function node_coefficient_optimization(name = "") {
  return name.replace(/(\d+(\.\d+)?)(x|X)/, "$1×").replace(/\.?0+×/, "×");
}

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
