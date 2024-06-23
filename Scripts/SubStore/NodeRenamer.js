function operator(proxies = [], targetPlatform, context) {
  proxies = nodes_filter(proxies);

  const name = $arguments.name + " ";
  proxies.forEach((proxy = { name: "" }) => {
    let result = proxy.name;

    result = country_name_optimization(result);

    result = node_order_optimization(result);

    result = node_coefficient_optimization(result);

    result = name_optimization(result);

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
    HKG: ["(🇭🇰\\s)?(香港|Hong\\s?Kong|HKG?)", "🇭🇰"],
    TWN: ["((🇹🇼|🇨🇳)\\s)?(台湾|Taiwan|TWN?)", "🇹🇼"],
    SGP: ["(🇸🇬\\s)?(新加坡|Singapore|SGP?)", "🇸🇬"],
    IND: ["(🇮🇳\\s)?(印度|India|IND?)", "🇮🇳"],
    IDN: ["(🇮🇩\\s)?(印度尼西亚|印尼|Indonesia|IDN?)", "🇮🇩"],
    PHL: ["(🇵🇭\\s)?(菲律宾|Philippines|PHL?)", "🇵🇭"],
    MYS: ["(🇲🇾\\s)?(马来西亚|Malaysia|MYS?)", "🇲🇾"],
    MAC: ["(🇲🇴\\s)?(澳门|Macao|MAC|MO)", "🇲🇴"],
    THA: ["(🇹🇭\\s)?(泰国|Thailand|THA?)", "🇹🇭"],
    VNM: ["(🇻🇳\\s)?(越南|Viet\\s?Nam|Vietnam|VNM?)", "🇻🇳"],
    KHM: ["(🇰🇭\\s)?(柬埔寨|Cambodia|KHM?)", "🇰🇭"],
    MMR: ["(🇲🇲\\s)?(缅甸|Myanmar|MMR?)", "🇲🇲"],
    BGD: ["(🇧🇩\\s)?(孟加拉国|Bangladesh|BG?D)", "🇧🇩"],
    AUS: ["(🇦🇺\\s)?(澳大利亚|Australia|AUS?)", "🇦🇺"],
    NZL: ["(🇳🇿\\s)?(新西兰|New\\s?Zealand|NZL?)", "🇳🇿"],
    MNG: ["(🇲🇳\\s)?(蒙古国?|Mongolia|MNG?)", "🇲🇳"],
    JPN: ["(🇯🇵\\s)?(日本|Japan|JPN?)", "🇯🇵"],
    PRK: ["(🇰🇵\\s)?(朝鲜|North\\s?Korea|KP|PRK)", "🇰🇵"],
    KOR: ["(🇰🇷\\s)?(韩国|Korea|South\\s?Korea|KO?R)", "🇰🇷"],
    USA: ["(🇺🇸\\s)?(美国|United\\s?States|USA?)", "🇺🇸"],
    CAN: ["(🇨🇦\\s)?(加拿大|Canada|CAN?)", "🇨🇦"],
    MEX: ["(🇲🇽\\s)?(墨西哥|Mexico|ME?X)", "🇲🇽"],
    BRA: ["(🇧🇷\\s)?(巴西?|Brazil|BRA?)", "🇧🇷"],
    CHL: ["(🇨🇱\\s)?(智利(共和国)?|Chile|CH?L)", "🇨🇱"],
    ARG: ["(🇦🇷\\s)?(阿根廷|Argentina|ARG?)", "🇦🇷"],
    COL: ["(🇨🇴\\s)?(哥伦比亚|Colombia|COL?)", "🇨🇴"],
    PER: ["(🇵🇪\\s)?(秘鲁|Peru|PER?)", "🇵🇪"],
    BOL: ["(🇧🇴\\s)?(玻利维亚|Bolivia|BOL?)", "🇧🇴"],
    DEU: ["(🇩🇪\\s)?(德国|Germany|DEU?)", "🇩🇪"],
    GBR: ["(🇬🇧\\s)?(英国|United\\s?Kingdom|GBR?|UK)", "🇬🇧"],
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
  const number_rules = [/(\d{2})(?!(X|x\\.|×))/, /(\d)(?!(X|x\\.|×))/];

  if (!name.match(number_rules[0])) {
    name = name.replace(number_rules[1], "0$1 ");
  }
  return name;
}

function node_coefficient_optimization(name = "") {
  return name.replace(/(\d+(\.\d+)?)(x|X)/, "$1×").replace(/\.?0+×/, "×");
}

function name_optimization(name = "") {
  const name_optimization_rules = [
    {
      previous: /Media|\[|\]/g,
      current: "",
    },
    {
      previous: /\-/g,
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
      previous: /\s+/g,
      current: " ",
    },
  ];

  name_optimization_rules.forEach((rule) => {
    name = name.replaceAll(rule["previous"], rule["current"]);
  });

  return name;
}
