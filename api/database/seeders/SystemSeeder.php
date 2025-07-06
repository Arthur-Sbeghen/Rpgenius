<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;
use Illuminate\Support\Facades\Storage;

class SystemSeeder extends Seeder
{
    public function run()
    {
        $jsonString = '{
  "stats": {
    "pv": {
      "input": "number",
      "value": "6",
      "description": "Pontos de vida",
      "modifiers": {
        "fisico": "0"
      }
    },
    "actions": {
      "input": "number",
      "value": "1"
    },
    "defence": {
      "input": "number",
      "value": "5"
    },
    "initiative": {
      "input": "number",
      "value": "1"
    },
    "nivel": {
      "input": "number",
      "value": "1"
    },
    "xp": {
      "value": 0
    },
    "next_level": {
      "nivel2": {
        "xp": "10",
        "modifiers": {
          "target": ["stats.pv", "background"],
          "effect": ["1d6", "+1"]
        }
      },
      "nivel3": {
        "xp": "20",
        "modifiers": {
          "target": ["attributes", "skill"],
          "effect": ["+1", "+1"]
        }
      },
      "nivel4": {
        "xp": "30",
        "modifiers": {
          "target": ["attributes", "skill", "background"],
          "effect": ["+1", "+1", "+1"]
        }
      },
      "nivel5": {
        "xp": "45",
        "modifiers": {
          "target": ["stats.pv", "attributes"],
          "effect": ["1d6", "+1"]
        }
      },
      "nivel6": {
        "xp": "60",
        "modifiers": {
          "target": ["stats.pv", "attributes", "skill", "background"],
          "effect": ["1d6", "+1", "+1", "+1"]
        }
      }
    },
    "money": "150"
  },
  "attributes": {
    "fisico": {
      "input": "number",
      "value": "0",
      "max-value": "5",
      "description": "Pontos de Físico",
      "modifier": {
        "target": "stats.pv",
        "effect": "1d6+2",
        "calculation": "per_point"
      }
    },
    "intelecto": {
      "input": "number",
      "value": "0",
      "max-value": "5",
      "description": "Pontos de Intelecto",
      "modifier": {
        "target": "background",
        "effect": "+1",
        "calculation": "per_point"
      }
    },
    "agilidade": {
      "input": "number",
      "value": "0",
      "max-value": "5",
      "description": "Pontos de Agilidade",
      "modifier": {
        "target": "stats.action",
        "effect": "+1",
        "calculation": "per_point"
      }
    },
    "coragem": {
      "input": "number",
      "value": "0",
      "max-value": "5",
      "description": "Pontos de Coragem",
      "modifier": {
        "target": "stats.initiative",
        "effect": "+1",
        "calculation": "per_point"
      }
    }
  },
  "background": {
    "input": "number",
    "value": "4",
    "description": "Pontos de Antecedentes",
    "types": {
      "combate": {
        "input": "number",
        "description": "Seja uma veterana da Guerra Civil, ou um errante solitário acompanhado de seu revólver, você tem costume de se meter em pelejas e tiroteios. O motivo? Qualquer um. Alguém que te olhou torto e te chamou de bunda mole, ofendeu sua mula, trapaceou no carteado ou só tem uma fuça que você não gostou. Viver pela violência é sua mácula mas é a maneira que você encontrou para sobreviver Este Antecedente é o mais importante para atirar com suas armas, sair no soco e até ter noção de estrategias em batalhas maiores. É recomendado ao menos um ponto neste Antecedente devido à temática e estilo do jogo.",
        "value": "0",
        "max-value": "5"
      },
      "negocios": {
        "input": "number",
        "description": "Engana-se quem acha que falo apenas de velhos com barba escrota atrás de suas grandes mesas de mogno. Me refiro a negócios de saloon, acordos entre comerciantes. Me refiro também a quem seduz e fascina, que usa seu charme e seu melhor perfume para enganar e mentir. De quem domina a arte de soltar xingamentos e ameaças camufladas de sorriso. Use este Antecedente para seduzir, negociar, descobrir mentiras e más intenções, convencer pessoas e em tudo que envolva diálogos carregados de subtexto.",
        "value": "0",
        "max-value": "5"
      },
      "labuta": {
        "input": "number",
        "description": "O trabalho pesado deixou seu corpo resistente e calejado para aguentar longas horas debaixo do sol, no frio, na chuva ou na escuridão das minas de carvão. A labuta te deu o conhecimento para construir e consertar coisas delicadas, ao passo que também serve para demonstrar sua aptidões físicas. Nadar, correr, saltar mais longe e diversas outras peripécias que sua personagem pode fazer. Este Antecedente pode ser usado em diversos testes referentes a ofícios, trabalhos e esforço físico.",
        "value": "0",
        "max-value": "5"
      },
      "tradicao": {
        "input": "number",
        "description": "Você faz questão de preservar a sua sua cultura. As histórias, as crenças, e os conhecimentos transmitidos através de inúmeras gerações até chegar em você. Você conhece a fauna e a flora como ninguém e sabe a melhor maneira de tirar proveito de toda essa sabedoria, sempre respeitando a terra e tudo o que é gerado por ela. Este Antecedente serve para muitas coisas: desde o conhecimento sobre venenos e remédios feitos com plantas silvestres, detalhes sobre os animais selvagens da região, você sabe rastrear muito bem e se comunicar com outras culturas sem qualquer problema.",
        "value": "0",
        "max-value": "5"
      },
      "medicina": {
        "input": "number",
        "description": "Você tem conhecimento acadêmico sobre anatomia e cura, é especialista em procedimentos cirúrgicos e sabe remover balas de um corpo como ninguém, mesmo que envolva muito sangue e material de procedência duvidosa. Você também sabe como tratar diversas doenças terríveis que assolam as pessoas do Oeste. Faça testes com esse Antecedente para ajudar na recuperação de Pontos de Vida de seus aliados durante o descanso. Também use-o para conseguir ou produzir remédios e obter informações sobre novas infecções e doenças.",
        "value": "0",
        "max-value": "5"
      },
      "montaria": {
        "input": "number",
        "description": "Este Antecedente é o que lhe dá domínio sobre cavalos, burricos e animais de montaria. Você pode ter trabalhado num estábulo ou alguém que cuidava de gado e de outros cavalos. Este Antecedente lhe dá bônus para qualquer manobra que queira fazer com sua montaria, além de torná-la mais confiante e veloz. Você sabe avaliar a qualidade de um belo corcel, sabe rastrear gado roubado e até conhece os envolvidos na pecuária da região.",
        "value": "0",
        "max-value": "5"
      },
      "exploracao": {
        "input": "number",
        "description": "Ainda há muito o que desbravar pela vastidão da América. O território é inóspito e novo, cheio de surpresas e de paisagens deslumbrantes. Para isso é preciso se adaptar e sobreviver nos ermos e terrenos mais hostis do país. Sua personagem está sempre atenta a seus arredores, de olhos e ouvidos abertos para qualquer movimento suspeito. É por isso que este Antecedente pode ser usado para perceber ameaças, para sobreviver na selva, no deserto, na chuva, na fazenda ou numa casinha de sapê. Também pode ser usado para rastrear e apagar os próprios rastros e cheiros.",
        "value": "0",
        "max-value": "5"
      },
      "roubo": {
        "input": "number",
        "description": "Sua maneira de ganhar a vida não é lá muito honesta. Você pode ter escapado da forca algumas vezes e sabe se virar com pouco entre outros que têm muito. Sua personagem é ligeira, tem dedos rápidos, é furtiva e muito ágil para fugir de encrencas. É provável que seu casaco tenha vários bolsos e você tenha muitas cartas na manga. Você não precisa blefar, seus dedos ágeis estão prontos para aplicar uma bela de uma trapaça. Se tudo der certo você faz uma grana boa. Se der errado... Bom, se der errado a gente vê o que acontece depois.",
        "value": "0",
        "max-value": "5"
      }
    }
  },
  "skills": {
    "value": "2",
    "types": [
      {
        "name": "Light My Fire",
        "description": "Eles são a doença e você é a cura. Se você não fosse tão rápido e mortal no gatilho, já estaria na terra do pé-junto. Sempre que atirar com seu revólver você recebe +1 para fazer o teste. Você também adiciona +1 no dano para cada ponto de Agilidade que tiver."
      },
      {
        "name": "Lets Dance",
        "description": "Martelar o cão é puxar o gatilho e bater na parte da arma que empurra a bala para fora do tambor. Isso era feito para atirar com mais velocidade e menos precisão. É possível fazer dois disparos com uma única ação, mas com penalidade de -1 para seu teste no Antecedente Combate."
      },
      {
        "name": "Fortunate Son",
        "description": "Se a morte abraçar sua personagem e ela cair a ZERO Pontos de Vida naquela sessão, esta habilidade faz com que ela recupere 3 Pontos de Vida, e se levante no turno seguinte para continuar sua jornada pela Terra. Porém, se ela tornar a cair no mesmo combate, a morte não vai deixá-la escapar novamente."
      },
      {
        "name": "Another One Bites To Dust",
        "description": "A personagem pode escolher uma das manobras abaixo para usar no combate. Repare que são "estilos de luta" então servem para apenas para golpes que não envolvam armas. Você pode pegar esta habilidade mais de uma vez para conseguir todas as manobras e se tornar uma máquina de enfiar a porrada",
        "manobras": [
          {
            "name": "Rasteira",
            "description": "é feito um teste contra o oponente, que se derrotado cai no chão e gasta uma ação para levantar."
          },
          {
            "name": "Suplex",
            "description": "faça um teste contra o oponente, que se perder, é arremessado de cabeça no chão, tomando 2d6 de dano."
          },
          {
            "name": "Briga de Bar",
            "description": "você pode usar qualquer coisa como arma: garrafas, cadeiras, escadas ou vassouras. Objetos pequenos causam 1d3 de dano, médios causam 1d6 e grandes causam 1d6+3 de dano."
          },
          {
            "name": "Tapa Com As Costas Da Mão",
            "description": "a bifa faz com que a dignidade do inimigo saia dele por alguns momentos, deixando-o pasmo e surpreso. É preciso gastar uma ação para se recuperar desse tapa na dignidade."
          }
        ]
      },
      {
        "name": "Heartbreaker",
        "description": "Sua personagem pode se apresentar inocente, sedutora, simpática ou até intimidadora ao oponente. Uma vez por sessão, escolha um alvo por nível e este terá -1 para realizar qualquer ação ofensiva contra sua personagem. Você também pode escolher outro membro do grupo para receber esta vantagem no seu lugar."
      },
      {
        "name": "Barracuda",
        "description": "Muitas vezes obter informações sobre seus inimigos pode te dar vantagens na hora de resolver conflitos. Você tem mais contatos, e sabe como conseguir respostas sem levantar suspeitas. Você tem +1 por nível (máximo 5) nos testes de Antecedente para descobrir coisas sobre algo, alguém ou algum lugar."
      },
      {
        "name": "Sweet Emotion",
        "description": "Você sabe inspirar seus aliados em momentos difíceis. Confira quais bônus você pode dar a eles conforme avança de nível (considerando os anteriores) e quantas vezes esta habilidade pode ser usada por sessão."
      },
      {
        "name": "Dont Stop Believing",
        "description": "Ao atirar com armas de longa distância, como espingardas ou arcos longos, adicione +1 no teste para acertar o inimigo. Além disso, some +1 no dano para cada ponto de Inteligência."
      },
      {
        "name": "Immigrant Song",
        "description": "Seja por força ou técnica. Na graça ou na brutalidade. Esta habilidade lhe dá capacidade de machucar ainda mais seus oponentes com ataques desarmados. Em vez de 1d3, o dano passa a ser 1d6, além de somar +1 para cada ponto no Atributo Físico."
      },
      {
        "name": "Gimme Shelter",
        "description": "Sempre que fizer um ataque surpresa usando facas ou navalhas, seu ataque causa +1d6 de dano a cada 3 níveis."
      },
      {
        "name": "Riders On The Storm",
        "description": "Sacrifique a própria segurança para cortar o mal pela raíz. Aumente o dano do ataque corpo a corpo em +1d6 por nível a cada 3 Pontos de Vida sacrificados. Sua personagem abre a guarda enquanto ataca um oponente com mais força. Essa habilidade pode ser usada apenas uma vez por combate."
      },
      {
        "name": "Born To Be Wild",
        "description": "A personagem sabe aproveitar luzes e sombras para se camuflar e caminhar furtivamente, ao mesmo tempo que tem atenção redobrada para notar o que não deveria estar ali. Sempre que fizer teste de algum Antecedente que envolva ser furtivo ou perceber alguma coisa, some +1 no teste."
      },
      {
        "name": "Smoke On The Water",
        "description": "Você é especialista em armas rústicas e mortais. Estamos falando de facas de pedra, lanças, machadinhas, porretes ou até algo de metal mais rudimentar. Sempre que fizer um ataque com este tipo de arma, você recebe +1 nos testes para acertar, além de +1 no dano para cada ponto no Atributo Físico."
      },
      {
        "name": "Under Pressure",
        "description": "Viver na natureza tornou seu corpo resistente a venenos e outras substâncias nocivas, além de torná-lo forte contra doenças, climas extremos, fome ou sede. Sempre que precisar fazer um Teste de Resistência a qualquer fator adverso some +1 por nível (máximo 5) na sua rolagem."
      },
      {
        "name": "Carry On The Wayward Son",
        "description": "Às vezes a sorte abre aquele sorrisão para os fodidos. Uma vez por nível, você pode refazer algum teste que deu ruim. Você também pode optar por gastar essa habilidade com outra pessoa, dando a ela uma chance de refazer seu teste. É hora de agarrar a sorte e não deixar de ser cowboy por ela."
      },
      {
        "name": "War Pigs",
        "description": "Você gosta de ver chama voar e fogo no céu. Sempre que utilizar TNT, dinamite, nitroglicerina ou qualquer explosivo, seu personagem ganha +1 no teste de Antecedente para fazer BOOOOM!"
      },
      {
        "name": "Ace of Spades",
        "description": "Você tem a sagacidade aguçada para um carteado do bom. Sempre quiser trapacear ou perceber alguém roubando no jogo de cartas receba +1 em testes do Antecedente Roubo."
      },
      {
        "name": "A Horse With No Name",
        "description": "Você e sua montaria estão sempre em sincronia, todos os testes que a envolvam tem bônus de +1."
      },
      {
        "name": "I Want to Hold Your Hand",
        "description": "Sua personagem tem vasta experiência para remendar pessoas, fechar feridas, fazer pontos, remover balas Sempre que ajudar alguém a se curar, ou curar a si mesma, adicione 1d6 PVs por nível durante seus tratamentos."
      },
      {
        "name": "Paranoid",
        "description": "Olhando ao redor, sua personagem é desconfiada e atenta, ela pressente o perigo e se adianta. Esta habilidade garante +1 nos seus resultados de Iniciativa. Sua personagem nunca é pega desprevenida."
      },
      {
        "name": "Ramble On",
        "description": "Não é questão de covardia, mas de sobrevivência. Por que ficar e morrer se é possível dar no pé e ver o sol nascer outra vez? Você gasta uma única ação para se mover duas vezes, e também tem bônus de +1 em testes de Antecedente para situações de fuga."
      },
      {
        "name": "Aqualung",
        "description": "A natureza é familiar a você, assim como seus desafios e perigos. Você sabe nadar muito bem, escalar e subir em árvores com muita facilidade. Sempre que fizer testes que envolvam habilidades atléticas, como natação, escalar, subir, saltar e coisas do tipo, você tem bônus de +1 para o resultado do dado"
      },
      {
        "name": "More Than A Feeling",
        "description": "Com sua dedução apurada, você pode descobrir coisas que pessoas comuns jamais encontrariam. Faça um teste no Antecedente Negócios e se passar pode fazer duas perguntas à Juíza para descobrir se alguém está escondendo alguma informação importante. Essa habilidade pode ser usada só uma vez por sessão."
      }
    ]
  },
  "torment": [
    {
      "name": "vingança",
      "values": {
        "1": "pelo amor da minha vida.",
        "2": "pelos meus filhos.",
        "3": "por minha terra roubada.",
        "4": "pela morte de um parceiro.",
        "5": "pela minha tribo.",
        "6": "pelo fim da minha gangue."
      }
    },
    {
      "name": "fugindo",
      "values": {
        "1": "da lei.",
        "2": "da gangue inimiga.",
        "3": "de um mercenário.",
        "4": "de uma família poderosa.",
        "5": "de um culto religioso.",
        "6": "de um casamento."
      }
    },
    {
      "name": "vicio",
      "values": {
        "1": "em álcool.",
        "2": "em drogas.",
        "3": "em brigas.",
        "4": "em apostas.",
        "5": "em adrenalina.",
        "6": "em algo bizarro."
      }
    },
    {
      "name": "segredo",
      "values": {
        "1": "sou um infiltrado da lei.",
        "2": "sou de uma família rica.",
        "3": "tenho algo contagioso.",
        "4": "matei alguém importante.",
        "5": "tenho uma grande dívida.",
        "6": "tenho um tesouro comigo."
      }
    },
    {
      "name": "doença",
      "values": {
        "1": "na pele do rosto.",
        "2": "na mente.",
        "3": "no intestino.",
        "4": "nas pernas.",
        "5": "nos olhos.",
        "6": "nas mãos."
      }
    },
    {
      "name": "dever",
      "values": {
        "1": "com a família.",
        "2": "com a lei.",
        "3": "com a gangue.",
        "4": "com deus.",
        "5": "com meu cavalo.",
        "6": "com minha dívida."
      }
    }
  ],
  "mount": {
    "has_mount": "0",
    "default_value": "3",
    "attributes": {
      "potencia": {
        "value": "0",
        "description": ""
      },
      "resistencia": {
        "value": "0",
        "description": ""
      },
      "fidelidade": {
        "value": "0",
        "description": ""
      }
    },
    "level": "0"
  },
  "reputation": {
    "value": "0",
    "max-value": "1",
    "min-value": "-1"
  }
}';


        System::firstOrCreate([
            'name' => 'Som das Seis',
            'variables' => $jsonString, 
            'description' => 'Sistema de RPG de faroeste',
            'created_at' => now(),
            'updated_at' => now()
        ]);

    }
}