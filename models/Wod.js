module.exports = {

  validate: (data) => {

    const wod = data.wod,
         file = data.file,
          tag = data.tag;


    if (data.needs._id === true && (!wod._id || typeof wod._id !== 'string')) {
      return {
        success: false,
        message: `wod does not have an _id. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.type === true && (!wod.type || typeof wod.type !== 'string')) {
      return {
        success: false,
        message: `wod does not have a type. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.instructions === true && (!wod.instructions || typeof wod.instructions !== 'string')) {
      return {
        success: false,
        message: `wod does not have any instructions. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.timer === true && (!wod.timer || typeof wod.timer !== 'number')) {
      return {
        success: false,
        message: `wod does not have a timer. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.repScheme === true && (!wod.repScheme || typeof wod.repScheme !== 'string')) {
      return {
        success: false,
        message: `wod does not have a repScheme. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.rounds === true && (!wod.rounds || typeof wod.rounds !== 'number')) {
      return {
        success: false,
        message: `wod does not have any rounds. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.reps === true && (!wod.reps || typeof wod.reps !== 'string')) {
      return {
        success: false,
        message: `wod does not have any reps. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.run === true && (!wod.run || typeof wod.run !== 'boolean')) {
      return {
        success: false,
        message: `wod does not have any run. ${file} tag: ${tag}`
      };
    }
    else if (data.needs.exercises === true && (!wod.exercises || Array.isArray(wod.exercises) !== true)) {
      return {
        success: false,
        message: `wod does not have any exercises. ${file} tag: ${tag}`
      };
    }
    else {
      return {
        success: true,
        message: 'wod passed validation.'
      };
    }
  }
};