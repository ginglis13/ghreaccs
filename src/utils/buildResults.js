

function buildResults(type, data){
  let rockets = 0;
  let thumbsup = 0;
  let thumbsdown = 0;
  let laugh = 0;
  let confused = 0;
  let heart = 0;
  let hooray = 0;
  let eyes = 0;

  for ( let i = 0; i < data.length; i++){
    const reaccs = data[i]['reactions']['nodes'];
    for(let j = 0; j < reaccs.length; j++){
      if (reaccs[j]['content'] === 'HOORAY'){
        hooray++;
      } else if (reaccs[j]['content'] === 'ROCKET'){
        rockets++;
      } else if (reaccs[j]['content'] === 'THUMBS_UP'){
        thumbsup++;
      } else if (reaccs[j]['content'] === 'THUMBS_DOWN'){
        thumbsdown++;
      } else if (reaccs[j]['content'] === 'HEART'){
        heart++;
      } else if (reaccs[j]['content'] === 'EYES'){
        eyes++;
      } else if (reaccs[j]['content'] === 'CONFUSED'){
        confused++;
      } else if (reaccs[j]['content'] === 'LAUGH'){
        laugh++;
      }
    }
  }
  return {
      'heart': heart,
      'hooray': hooray,
      'thumbsup': thumbsup,
      'thumbsdown': thumbsdown,
      'rockets': rockets,
      'eyes': eyes,
      'confused': confused,
      'laugh': laugh,

  };
}

export default buildResults;
