export function useLine(equation: string) {
  // Regex para a forma reduzida: y = mx + b (com frações)
  const retaReduzidaRegex = /^y\s*=\s*([+-]?\d*(?:\/\d+)?(?:\.\d+)?|[+-]?)x\s*([+-]?\d*(?:\/\d+)?(?:\.\d+)?)?$/;
  // Regex para a forma geral: Ax + By + C = 0 (frações ainda não suportadas nesse formato)
  const retaGeralRegex = /^([+-]?\d*(?:\.\d+)?)[xX]\s*([+-])\s*(\d*(?:\.\d+)?)[yY]\s*([+-]?\d*(?:\.\d+)?)\s*=\s*0$/;

  // Função auxiliar para converter frações para números decimais
  function parseFracao(f: string) {
    if (f.includes('/')) {
      const [numerador, denominador] = f.split('/');
      return parseFloat(numerador) / parseFloat(denominador);
    }
    return parseFloat(f);
  }

  // Tentativa com a forma reduzida
  let match = equation.match(retaReduzidaRegex);
  if (match) {
    let a : string | number = match[1];
    let b = match[2] ? parseFracao(match[2]) : 0; // Coeficiente linear b

    // Tratamento para o coeficiente angular m:
    // Se for apenas '-' ou '+', converte para -1 ou 1, respectivamente.
    if (a === '-' || a === '+') {
      a = a === '-' ? -1 : 1;
    } else {
      a = parseFracao(a) || 1; // Caso seja apenas 'x', assumimos m = 1
    }

    return { a, b };
  }

  return null; // Se a equação não corresponder a nenhum padrão
}

export function useCirc(equation: string) {
  const circunferenciaRegex1 = /^\(x\s*([+-])\s*(\d+)\)\^2\s*\+\s*\(y\s*([+-])\s*(\d+)\)\^2\s*=\s*(\d+)$/;
  const circunferenciaRegex2 = /^\(x\s*([+-])\s*(\d+)\)\^2\s*\+\s*\(y\s*([+-])\s*(\d+)\)\^2\s*=\s*(\d+)\^2$/

  if(circunferenciaRegex1.test(equation)) {
    const match = equation.match(circunferenciaRegex1);
    if (match) {
      let h = parseFloat(match[2]);
      let k = parseFloat(match[4]);
      let valorDireito = parseFloat(match[5]);
  
      // Ajusta os sinais de h e k
      if (match[1] === '+') h = -h;
      if (match[3] === '+') k = -k;
  
      // Calcula o raio como a raiz quadrada do número à direita
      let r = Math.sqrt(valorDireito);
  
      return { h, k, r };
    }
  }

  if(circunferenciaRegex2.test(equation)) {
    const match = equation.match(circunferenciaRegex2);
    if (match) {
      let h = parseFloat(match[2]);
      let k = parseFloat(match[4]);
      let r = parseFloat(match[5]);

      // Ajusta os sinais
      if (match[1] === '+') h = -h; // Se o sinal for '+', h é negativo
      if (match[3] === '+') k = -k; // Se o sinal for '+', k é negativo

      return { h, k, r };
    }
  }

  const circunferenciaRegex3 = /^x\^2\s*\+\s*y\^2\s*=\s*(\d+)\^2$|^x\^2\s*\+\s*y\^2\s*=\s*(\d+)$/;

  const match = equation.match(circunferenciaRegex3);
  
  if (match) {
    let r;

    // Se a equação estiver no formato x^2 + y^2 = r^2
    if (match[1]) {
      r = Math.sqrt(parseFloat(match[1]) ** 2); // r é o número à esquerda da equação
    } else {
      // Se a equação estiver no formato x^2 + y^2 = número
      r = Math.sqrt(parseFloat(match[2])); // Calcula a raiz quadrada do número
    }

    return { h:0, k: 0, r };
  }

  return null; // Se a equação não corresponder ao padrão
}