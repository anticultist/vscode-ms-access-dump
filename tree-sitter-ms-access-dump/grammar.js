module.exports = grammar({
  name: 'ms_access_dump',

  word: $ => $.identifier,

  rules: {
    dump: $ => repeat(
      choice(
        $._expression,
        $.code_section
      )),

    identifier: $ => /[a-zA-Z][a-zA-Z0-9]*/,

    _expression: $ => seq(
      choice(
        $.assignment,
        $.assignment_with_type,
        $.block,
        $.string,  // <- TODO: replace this workaround
        commaSep($.hex_value)
      ),
      $._newline
    ),
    
    _newline: $ => /\r?\n|\r/,

    string: $ => seq(
      '"',
      repeat(choice(
        /[^"\\\n]+|\\\r?\n|\\./
      )),
      '"'
    ),

    number: $ => token(
      seq(
        optional(/[+-]/),
        /[0-9][0-9_]*/,
        optional(seq('.', optional(/[0-9][0-9_]*/))),
        optional(/[eE][+-]?([0-9][0-9_]*)/)
      )
    ),

    hex_value: $ => seq(
      /0x([0-9a-f]+)/
    ),

    assignment: $ => seq(
      $.identifier,
      '=',
      field('value', choice(
        // newLineSep($.string),
        $.string,
        $.number,
        $.block,
        alias('NotDefault', $.not_default)
      ))
    ),

    assignment_with_type: $ => seq(
      choice(
        'dbAttachment',
        'dbBigInt',
        'dbBinary',
        'dbBoolean',
        'dbByte',
        'dbChar',
        'dbComplexByte',
        'dbComplexDecimal',
        'dbComplexDouble',
        'dbComplexGUID',
        'dbComplexInteger',
        'dbComplexLong',
        'dbComplexSingle',
        'dbComplexText',
        'dbCurrency',
        'dbDate',
        'dbDecimal',
        'dbDouble',
        'dbFloat',
        'dbGUID',
        'dbInteger',
        'dbLong',
        'dbLongBinary',
        'dbMemo',
        'dbNumeric',
        'dbSingle',
        'dbText',
        'dbTime',
        'dbTimeStamp',
        'dbVarBinary'
      ),
      field('name', $.string),
      '=',
      field('value', $.string)
    ),

    block: $ => seq(
      'Begin',
      optional($.identifier),
      $._newline,
      repeat($._expression),
      'End'
    ),

    code_section: $ => seq(
      'CodeBehindForm',
      $._newline,
      field('code', /(.|[\r\n])*/)
    )
  }
});

function commaSep(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

// function newLineSep(rule) {
//   return seq(rule, repeat(seq(/\r?\n|\r/, rule)));
// }
