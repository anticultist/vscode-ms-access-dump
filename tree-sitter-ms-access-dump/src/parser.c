#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 12
#define STATE_COUNT 48
#define LARGE_STATE_COUNT 14
#define SYMBOL_COUNT 56
#define ALIAS_COUNT 0
#define TOKEN_COUNT 44
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 3
#define MAX_ALIAS_SEQUENCE_LENGTH 5

enum {
  sym_identifier = 1,
  anon_sym_COMMA = 2,
  sym__newline = 3,
  anon_sym_DQUOTE = 4,
  aux_sym_string_token1 = 5,
  sym_number = 6,
  aux_sym_hex_value_token1 = 7,
  anon_sym_EQ = 8,
  anon_sym_NotDefault = 9,
  anon_sym_dbAttachment = 10,
  anon_sym_dbBigInt = 11,
  anon_sym_dbBinary = 12,
  anon_sym_dbBoolean = 13,
  anon_sym_dbByte = 14,
  anon_sym_dbChar = 15,
  anon_sym_dbComplexByte = 16,
  anon_sym_dbComplexDecimal = 17,
  anon_sym_dbComplexDouble = 18,
  anon_sym_dbComplexGUID = 19,
  anon_sym_dbComplexInteger = 20,
  anon_sym_dbComplexLong = 21,
  anon_sym_dbComplexSingle = 22,
  anon_sym_dbComplexText = 23,
  anon_sym_dbCurrency = 24,
  anon_sym_dbDate = 25,
  anon_sym_dbDecimal = 26,
  anon_sym_dbDouble = 27,
  anon_sym_dbFloat = 28,
  anon_sym_dbGUID = 29,
  anon_sym_dbInteger = 30,
  anon_sym_dbLong = 31,
  anon_sym_dbLongBinary = 32,
  anon_sym_dbMemo = 33,
  anon_sym_dbNumeric = 34,
  anon_sym_dbSingle = 35,
  anon_sym_dbText = 36,
  anon_sym_dbTime = 37,
  anon_sym_dbTimeStamp = 38,
  anon_sym_dbVarBinary = 39,
  anon_sym_Begin = 40,
  anon_sym_End = 41,
  anon_sym_CodeBehindForm = 42,
  aux_sym_code_section_token1 = 43,
  sym_dump = 44,
  sym__expression = 45,
  sym_string = 46,
  sym_hex_value = 47,
  sym_assignment = 48,
  sym_assignment_with_type = 49,
  sym_block = 50,
  sym_code_section = 51,
  aux_sym_dump_repeat1 = 52,
  aux_sym__expression_repeat1 = 53,
  aux_sym_string_repeat1 = 54,
  aux_sym_block_repeat1 = 55,
};

static const char *ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_identifier] = "identifier",
  [anon_sym_COMMA] = ",",
  [sym__newline] = "_newline",
  [anon_sym_DQUOTE] = "\"",
  [aux_sym_string_token1] = "string_token1",
  [sym_number] = "number",
  [aux_sym_hex_value_token1] = "hex_value_token1",
  [anon_sym_EQ] = "=",
  [anon_sym_NotDefault] = "not_default",
  [anon_sym_dbAttachment] = "dbAttachment",
  [anon_sym_dbBigInt] = "dbBigInt",
  [anon_sym_dbBinary] = "dbBinary",
  [anon_sym_dbBoolean] = "dbBoolean",
  [anon_sym_dbByte] = "dbByte",
  [anon_sym_dbChar] = "dbChar",
  [anon_sym_dbComplexByte] = "dbComplexByte",
  [anon_sym_dbComplexDecimal] = "dbComplexDecimal",
  [anon_sym_dbComplexDouble] = "dbComplexDouble",
  [anon_sym_dbComplexGUID] = "dbComplexGUID",
  [anon_sym_dbComplexInteger] = "dbComplexInteger",
  [anon_sym_dbComplexLong] = "dbComplexLong",
  [anon_sym_dbComplexSingle] = "dbComplexSingle",
  [anon_sym_dbComplexText] = "dbComplexText",
  [anon_sym_dbCurrency] = "dbCurrency",
  [anon_sym_dbDate] = "dbDate",
  [anon_sym_dbDecimal] = "dbDecimal",
  [anon_sym_dbDouble] = "dbDouble",
  [anon_sym_dbFloat] = "dbFloat",
  [anon_sym_dbGUID] = "dbGUID",
  [anon_sym_dbInteger] = "dbInteger",
  [anon_sym_dbLong] = "dbLong",
  [anon_sym_dbLongBinary] = "dbLongBinary",
  [anon_sym_dbMemo] = "dbMemo",
  [anon_sym_dbNumeric] = "dbNumeric",
  [anon_sym_dbSingle] = "dbSingle",
  [anon_sym_dbText] = "dbText",
  [anon_sym_dbTime] = "dbTime",
  [anon_sym_dbTimeStamp] = "dbTimeStamp",
  [anon_sym_dbVarBinary] = "dbVarBinary",
  [anon_sym_Begin] = "Begin",
  [anon_sym_End] = "End",
  [anon_sym_CodeBehindForm] = "CodeBehindForm",
  [aux_sym_code_section_token1] = "code_section_token1",
  [sym_dump] = "dump",
  [sym__expression] = "_expression",
  [sym_string] = "string",
  [sym_hex_value] = "hex_value",
  [sym_assignment] = "assignment",
  [sym_assignment_with_type] = "assignment_with_type",
  [sym_block] = "block",
  [sym_code_section] = "code_section",
  [aux_sym_dump_repeat1] = "dump_repeat1",
  [aux_sym__expression_repeat1] = "_expression_repeat1",
  [aux_sym_string_repeat1] = "string_repeat1",
  [aux_sym_block_repeat1] = "block_repeat1",
};

static TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_identifier] = sym_identifier,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [sym__newline] = sym__newline,
  [anon_sym_DQUOTE] = anon_sym_DQUOTE,
  [aux_sym_string_token1] = aux_sym_string_token1,
  [sym_number] = sym_number,
  [aux_sym_hex_value_token1] = aux_sym_hex_value_token1,
  [anon_sym_EQ] = anon_sym_EQ,
  [anon_sym_NotDefault] = anon_sym_NotDefault,
  [anon_sym_dbAttachment] = anon_sym_dbAttachment,
  [anon_sym_dbBigInt] = anon_sym_dbBigInt,
  [anon_sym_dbBinary] = anon_sym_dbBinary,
  [anon_sym_dbBoolean] = anon_sym_dbBoolean,
  [anon_sym_dbByte] = anon_sym_dbByte,
  [anon_sym_dbChar] = anon_sym_dbChar,
  [anon_sym_dbComplexByte] = anon_sym_dbComplexByte,
  [anon_sym_dbComplexDecimal] = anon_sym_dbComplexDecimal,
  [anon_sym_dbComplexDouble] = anon_sym_dbComplexDouble,
  [anon_sym_dbComplexGUID] = anon_sym_dbComplexGUID,
  [anon_sym_dbComplexInteger] = anon_sym_dbComplexInteger,
  [anon_sym_dbComplexLong] = anon_sym_dbComplexLong,
  [anon_sym_dbComplexSingle] = anon_sym_dbComplexSingle,
  [anon_sym_dbComplexText] = anon_sym_dbComplexText,
  [anon_sym_dbCurrency] = anon_sym_dbCurrency,
  [anon_sym_dbDate] = anon_sym_dbDate,
  [anon_sym_dbDecimal] = anon_sym_dbDecimal,
  [anon_sym_dbDouble] = anon_sym_dbDouble,
  [anon_sym_dbFloat] = anon_sym_dbFloat,
  [anon_sym_dbGUID] = anon_sym_dbGUID,
  [anon_sym_dbInteger] = anon_sym_dbInteger,
  [anon_sym_dbLong] = anon_sym_dbLong,
  [anon_sym_dbLongBinary] = anon_sym_dbLongBinary,
  [anon_sym_dbMemo] = anon_sym_dbMemo,
  [anon_sym_dbNumeric] = anon_sym_dbNumeric,
  [anon_sym_dbSingle] = anon_sym_dbSingle,
  [anon_sym_dbText] = anon_sym_dbText,
  [anon_sym_dbTime] = anon_sym_dbTime,
  [anon_sym_dbTimeStamp] = anon_sym_dbTimeStamp,
  [anon_sym_dbVarBinary] = anon_sym_dbVarBinary,
  [anon_sym_Begin] = anon_sym_Begin,
  [anon_sym_End] = anon_sym_End,
  [anon_sym_CodeBehindForm] = anon_sym_CodeBehindForm,
  [aux_sym_code_section_token1] = aux_sym_code_section_token1,
  [sym_dump] = sym_dump,
  [sym__expression] = sym__expression,
  [sym_string] = sym_string,
  [sym_hex_value] = sym_hex_value,
  [sym_assignment] = sym_assignment,
  [sym_assignment_with_type] = sym_assignment_with_type,
  [sym_block] = sym_block,
  [sym_code_section] = sym_code_section,
  [aux_sym_dump_repeat1] = aux_sym_dump_repeat1,
  [aux_sym__expression_repeat1] = aux_sym__expression_repeat1,
  [aux_sym_string_repeat1] = aux_sym_string_repeat1,
  [aux_sym_block_repeat1] = aux_sym_block_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_identifier] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [sym__newline] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_DQUOTE] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_string_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_number] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_hex_value_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_NotDefault] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_dbAttachment] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbBigInt] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbBinary] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbBoolean] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbByte] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbChar] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexByte] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexDecimal] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexDouble] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexGUID] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexInteger] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexLong] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexSingle] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbComplexText] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbCurrency] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbDate] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbDecimal] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbDouble] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbFloat] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbGUID] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbInteger] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbLong] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbLongBinary] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbMemo] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbNumeric] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbSingle] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbText] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbTime] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbTimeStamp] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dbVarBinary] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_Begin] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_End] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CodeBehindForm] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_code_section_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_dump] = {
    .visible = true,
    .named = true,
  },
  [sym__expression] = {
    .visible = false,
    .named = true,
  },
  [sym_string] = {
    .visible = true,
    .named = true,
  },
  [sym_hex_value] = {
    .visible = true,
    .named = true,
  },
  [sym_assignment] = {
    .visible = true,
    .named = true,
  },
  [sym_assignment_with_type] = {
    .visible = true,
    .named = true,
  },
  [sym_block] = {
    .visible = true,
    .named = true,
  },
  [sym_code_section] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_dump_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__expression_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_string_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_block_repeat1] = {
    .visible = false,
    .named = false,
  },
};

enum {
  field_code = 1,
  field_name = 2,
  field_value = 3,
};

static const char *ts_field_names[] = {
  [0] = NULL,
  [field_code] = "code",
  [field_name] = "name",
  [field_value] = "value",
};

static const TSFieldMapSlice ts_field_map_slices[4] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 2},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_value, 2},
  [1] =
    {field_code, 2},
  [2] =
    {field_name, 1},
    {field_value, 3},
};

static TSSymbol ts_alias_sequences[4][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(11);
      if (lookahead == '"') ADVANCE(15);
      if (lookahead == ',') ADVANCE(13);
      if (lookahead == '0') ADVANCE(20);
      if (lookahead == '=') ADVANCE(26);
      if (('+' <= lookahead && lookahead <= '-')) ADVANCE(6);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(21);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 1:
      if (lookahead == '\n') SKIP(1)
      if (lookahead == '"') ADVANCE(15);
      if (lookahead == '\\') ADVANCE(9);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(18);
      if (lookahead != 0) ADVANCE(19);
      END_STATE();
    case 2:
      if (lookahead == '\n') ADVANCE(14);
      if (lookahead == '\r') ADVANCE(14);
      if (lookahead == ',') ADVANCE(13);
      if (lookahead == '\t' ||
          lookahead == ' ') SKIP(2)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 3:
      if (lookahead == '"') ADVANCE(15);
      if (lookahead == '+' ||
          lookahead == '-') ADVANCE(6);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(3)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(21);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 4:
      if (lookahead == 'x') ADVANCE(8);
      END_STATE();
    case 5:
      if (lookahead == '+' ||
          lookahead == '-') ADVANCE(7);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(24);
      END_STATE();
    case 6:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(21);
      END_STATE();
    case 7:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(24);
      END_STATE();
    case 8:
      if (('0' <= lookahead && lookahead <= '9') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(25);
      END_STATE();
    case 9:
      if (lookahead != 0 &&
          lookahead != '\r') ADVANCE(16);
      if (lookahead == '\r') ADVANCE(17);
      END_STATE();
    case 10:
      if (eof) ADVANCE(11);
      if (lookahead == '"') ADVANCE(15);
      if (lookahead == '0') ADVANCE(4);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(10)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(sym_identifier);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym__newline);
      if (lookahead == '\n') ADVANCE(14);
      if (lookahead == '\r') ADVANCE(14);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(aux_sym_string_token1);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(aux_sym_string_token1);
      if (lookahead == '\n') ADVANCE(16);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(aux_sym_string_token1);
      if (lookahead == '\\') ADVANCE(9);
      if (lookahead == '\t' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '"') ADVANCE(19);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(aux_sym_string_token1);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '"' &&
          lookahead != '\\') ADVANCE(19);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_number);
      if (lookahead == '.') ADVANCE(22);
      if (lookahead == 'x') ADVANCE(8);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(5);
      if (('0' <= lookahead && lookahead <= '9') ||
          lookahead == '_') ADVANCE(21);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym_number);
      if (lookahead == '.') ADVANCE(22);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(5);
      if (('0' <= lookahead && lookahead <= '9') ||
          lookahead == '_') ADVANCE(21);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(sym_number);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(5);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(23);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym_number);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(5);
      if (('0' <= lookahead && lookahead <= '9') ||
          lookahead == '_') ADVANCE(23);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym_number);
      if (('0' <= lookahead && lookahead <= '9') ||
          lookahead == '_') ADVANCE(24);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(aux_sym_hex_value_token1);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('a' <= lookahead && lookahead <= 'f')) ADVANCE(25);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(aux_sym_code_section_token1);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(27);
      if (lookahead != 0) ADVANCE(28);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_code_section_token1);
      if (lookahead != 0) ADVANCE(28);
      END_STATE();
    default:
      return false;
  }
}

static bool ts_lex_keywords(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (lookahead == 'B') ADVANCE(1);
      if (lookahead == 'C') ADVANCE(2);
      if (lookahead == 'E') ADVANCE(3);
      if (lookahead == 'N') ADVANCE(4);
      if (lookahead == 'd') ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      END_STATE();
    case 1:
      if (lookahead == 'e') ADVANCE(6);
      END_STATE();
    case 2:
      if (lookahead == 'o') ADVANCE(7);
      END_STATE();
    case 3:
      if (lookahead == 'n') ADVANCE(8);
      END_STATE();
    case 4:
      if (lookahead == 'o') ADVANCE(9);
      END_STATE();
    case 5:
      if (lookahead == 'b') ADVANCE(10);
      END_STATE();
    case 6:
      if (lookahead == 'g') ADVANCE(11);
      END_STATE();
    case 7:
      if (lookahead == 'd') ADVANCE(12);
      END_STATE();
    case 8:
      if (lookahead == 'd') ADVANCE(13);
      END_STATE();
    case 9:
      if (lookahead == 't') ADVANCE(14);
      END_STATE();
    case 10:
      if (lookahead == 'A') ADVANCE(15);
      if (lookahead == 'B') ADVANCE(16);
      if (lookahead == 'C') ADVANCE(17);
      if (lookahead == 'D') ADVANCE(18);
      if (lookahead == 'F') ADVANCE(19);
      if (lookahead == 'G') ADVANCE(20);
      if (lookahead == 'I') ADVANCE(21);
      if (lookahead == 'L') ADVANCE(22);
      if (lookahead == 'M') ADVANCE(23);
      if (lookahead == 'N') ADVANCE(24);
      if (lookahead == 'S') ADVANCE(25);
      if (lookahead == 'T') ADVANCE(26);
      if (lookahead == 'V') ADVANCE(27);
      END_STATE();
    case 11:
      if (lookahead == 'i') ADVANCE(28);
      END_STATE();
    case 12:
      if (lookahead == 'e') ADVANCE(29);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_End);
      END_STATE();
    case 14:
      if (lookahead == 'D') ADVANCE(30);
      END_STATE();
    case 15:
      if (lookahead == 't') ADVANCE(31);
      END_STATE();
    case 16:
      if (lookahead == 'i') ADVANCE(32);
      if (lookahead == 'o') ADVANCE(33);
      if (lookahead == 'y') ADVANCE(34);
      END_STATE();
    case 17:
      if (lookahead == 'h') ADVANCE(35);
      if (lookahead == 'o') ADVANCE(36);
      if (lookahead == 'u') ADVANCE(37);
      END_STATE();
    case 18:
      if (lookahead == 'a') ADVANCE(38);
      if (lookahead == 'e') ADVANCE(39);
      if (lookahead == 'o') ADVANCE(40);
      END_STATE();
    case 19:
      if (lookahead == 'l') ADVANCE(41);
      END_STATE();
    case 20:
      if (lookahead == 'U') ADVANCE(42);
      END_STATE();
    case 21:
      if (lookahead == 'n') ADVANCE(43);
      END_STATE();
    case 22:
      if (lookahead == 'o') ADVANCE(44);
      END_STATE();
    case 23:
      if (lookahead == 'e') ADVANCE(45);
      END_STATE();
    case 24:
      if (lookahead == 'u') ADVANCE(46);
      END_STATE();
    case 25:
      if (lookahead == 'i') ADVANCE(47);
      END_STATE();
    case 26:
      if (lookahead == 'e') ADVANCE(48);
      if (lookahead == 'i') ADVANCE(49);
      END_STATE();
    case 27:
      if (lookahead == 'a') ADVANCE(50);
      END_STATE();
    case 28:
      if (lookahead == 'n') ADVANCE(51);
      END_STATE();
    case 29:
      if (lookahead == 'B') ADVANCE(52);
      END_STATE();
    case 30:
      if (lookahead == 'e') ADVANCE(53);
      END_STATE();
    case 31:
      if (lookahead == 't') ADVANCE(54);
      END_STATE();
    case 32:
      if (lookahead == 'g') ADVANCE(55);
      if (lookahead == 'n') ADVANCE(56);
      END_STATE();
    case 33:
      if (lookahead == 'o') ADVANCE(57);
      END_STATE();
    case 34:
      if (lookahead == 't') ADVANCE(58);
      END_STATE();
    case 35:
      if (lookahead == 'a') ADVANCE(59);
      END_STATE();
    case 36:
      if (lookahead == 'm') ADVANCE(60);
      END_STATE();
    case 37:
      if (lookahead == 'r') ADVANCE(61);
      END_STATE();
    case 38:
      if (lookahead == 't') ADVANCE(62);
      END_STATE();
    case 39:
      if (lookahead == 'c') ADVANCE(63);
      END_STATE();
    case 40:
      if (lookahead == 'u') ADVANCE(64);
      END_STATE();
    case 41:
      if (lookahead == 'o') ADVANCE(65);
      END_STATE();
    case 42:
      if (lookahead == 'I') ADVANCE(66);
      END_STATE();
    case 43:
      if (lookahead == 't') ADVANCE(67);
      END_STATE();
    case 44:
      if (lookahead == 'n') ADVANCE(68);
      END_STATE();
    case 45:
      if (lookahead == 'm') ADVANCE(69);
      END_STATE();
    case 46:
      if (lookahead == 'm') ADVANCE(70);
      END_STATE();
    case 47:
      if (lookahead == 'n') ADVANCE(71);
      END_STATE();
    case 48:
      if (lookahead == 'x') ADVANCE(72);
      END_STATE();
    case 49:
      if (lookahead == 'm') ADVANCE(73);
      END_STATE();
    case 50:
      if (lookahead == 'r') ADVANCE(74);
      END_STATE();
    case 51:
      ACCEPT_TOKEN(anon_sym_Begin);
      END_STATE();
    case 52:
      if (lookahead == 'e') ADVANCE(75);
      END_STATE();
    case 53:
      if (lookahead == 'f') ADVANCE(76);
      END_STATE();
    case 54:
      if (lookahead == 'a') ADVANCE(77);
      END_STATE();
    case 55:
      if (lookahead == 'I') ADVANCE(78);
      END_STATE();
    case 56:
      if (lookahead == 'a') ADVANCE(79);
      END_STATE();
    case 57:
      if (lookahead == 'l') ADVANCE(80);
      END_STATE();
    case 58:
      if (lookahead == 'e') ADVANCE(81);
      END_STATE();
    case 59:
      if (lookahead == 'r') ADVANCE(82);
      END_STATE();
    case 60:
      if (lookahead == 'p') ADVANCE(83);
      END_STATE();
    case 61:
      if (lookahead == 'r') ADVANCE(84);
      END_STATE();
    case 62:
      if (lookahead == 'e') ADVANCE(85);
      END_STATE();
    case 63:
      if (lookahead == 'i') ADVANCE(86);
      END_STATE();
    case 64:
      if (lookahead == 'b') ADVANCE(87);
      END_STATE();
    case 65:
      if (lookahead == 'a') ADVANCE(88);
      END_STATE();
    case 66:
      if (lookahead == 'D') ADVANCE(89);
      END_STATE();
    case 67:
      if (lookahead == 'e') ADVANCE(90);
      END_STATE();
    case 68:
      if (lookahead == 'g') ADVANCE(91);
      END_STATE();
    case 69:
      if (lookahead == 'o') ADVANCE(92);
      END_STATE();
    case 70:
      if (lookahead == 'e') ADVANCE(93);
      END_STATE();
    case 71:
      if (lookahead == 'g') ADVANCE(94);
      END_STATE();
    case 72:
      if (lookahead == 't') ADVANCE(95);
      END_STATE();
    case 73:
      if (lookahead == 'e') ADVANCE(96);
      END_STATE();
    case 74:
      if (lookahead == 'B') ADVANCE(97);
      END_STATE();
    case 75:
      if (lookahead == 'h') ADVANCE(98);
      END_STATE();
    case 76:
      if (lookahead == 'a') ADVANCE(99);
      END_STATE();
    case 77:
      if (lookahead == 'c') ADVANCE(100);
      END_STATE();
    case 78:
      if (lookahead == 'n') ADVANCE(101);
      END_STATE();
    case 79:
      if (lookahead == 'r') ADVANCE(102);
      END_STATE();
    case 80:
      if (lookahead == 'e') ADVANCE(103);
      END_STATE();
    case 81:
      ACCEPT_TOKEN(anon_sym_dbByte);
      END_STATE();
    case 82:
      ACCEPT_TOKEN(anon_sym_dbChar);
      END_STATE();
    case 83:
      if (lookahead == 'l') ADVANCE(104);
      END_STATE();
    case 84:
      if (lookahead == 'e') ADVANCE(105);
      END_STATE();
    case 85:
      ACCEPT_TOKEN(anon_sym_dbDate);
      END_STATE();
    case 86:
      if (lookahead == 'm') ADVANCE(106);
      END_STATE();
    case 87:
      if (lookahead == 'l') ADVANCE(107);
      END_STATE();
    case 88:
      if (lookahead == 't') ADVANCE(108);
      END_STATE();
    case 89:
      ACCEPT_TOKEN(anon_sym_dbGUID);
      END_STATE();
    case 90:
      if (lookahead == 'g') ADVANCE(109);
      END_STATE();
    case 91:
      ACCEPT_TOKEN(anon_sym_dbLong);
      if (lookahead == 'B') ADVANCE(110);
      END_STATE();
    case 92:
      ACCEPT_TOKEN(anon_sym_dbMemo);
      END_STATE();
    case 93:
      if (lookahead == 'r') ADVANCE(111);
      END_STATE();
    case 94:
      if (lookahead == 'l') ADVANCE(112);
      END_STATE();
    case 95:
      ACCEPT_TOKEN(anon_sym_dbText);
      END_STATE();
    case 96:
      ACCEPT_TOKEN(anon_sym_dbTime);
      if (lookahead == 'S') ADVANCE(113);
      END_STATE();
    case 97:
      if (lookahead == 'i') ADVANCE(114);
      END_STATE();
    case 98:
      if (lookahead == 'i') ADVANCE(115);
      END_STATE();
    case 99:
      if (lookahead == 'u') ADVANCE(116);
      END_STATE();
    case 100:
      if (lookahead == 'h') ADVANCE(117);
      END_STATE();
    case 101:
      if (lookahead == 't') ADVANCE(118);
      END_STATE();
    case 102:
      if (lookahead == 'y') ADVANCE(119);
      END_STATE();
    case 103:
      if (lookahead == 'a') ADVANCE(120);
      END_STATE();
    case 104:
      if (lookahead == 'e') ADVANCE(121);
      END_STATE();
    case 105:
      if (lookahead == 'n') ADVANCE(122);
      END_STATE();
    case 106:
      if (lookahead == 'a') ADVANCE(123);
      END_STATE();
    case 107:
      if (lookahead == 'e') ADVANCE(124);
      END_STATE();
    case 108:
      ACCEPT_TOKEN(anon_sym_dbFloat);
      END_STATE();
    case 109:
      if (lookahead == 'e') ADVANCE(125);
      END_STATE();
    case 110:
      if (lookahead == 'i') ADVANCE(126);
      END_STATE();
    case 111:
      if (lookahead == 'i') ADVANCE(127);
      END_STATE();
    case 112:
      if (lookahead == 'e') ADVANCE(128);
      END_STATE();
    case 113:
      if (lookahead == 't') ADVANCE(129);
      END_STATE();
    case 114:
      if (lookahead == 'n') ADVANCE(130);
      END_STATE();
    case 115:
      if (lookahead == 'n') ADVANCE(131);
      END_STATE();
    case 116:
      if (lookahead == 'l') ADVANCE(132);
      END_STATE();
    case 117:
      if (lookahead == 'm') ADVANCE(133);
      END_STATE();
    case 118:
      ACCEPT_TOKEN(anon_sym_dbBigInt);
      END_STATE();
    case 119:
      ACCEPT_TOKEN(anon_sym_dbBinary);
      END_STATE();
    case 120:
      if (lookahead == 'n') ADVANCE(134);
      END_STATE();
    case 121:
      if (lookahead == 'x') ADVANCE(135);
      END_STATE();
    case 122:
      if (lookahead == 'c') ADVANCE(136);
      END_STATE();
    case 123:
      if (lookahead == 'l') ADVANCE(137);
      END_STATE();
    case 124:
      ACCEPT_TOKEN(anon_sym_dbDouble);
      END_STATE();
    case 125:
      if (lookahead == 'r') ADVANCE(138);
      END_STATE();
    case 126:
      if (lookahead == 'n') ADVANCE(139);
      END_STATE();
    case 127:
      if (lookahead == 'c') ADVANCE(140);
      END_STATE();
    case 128:
      ACCEPT_TOKEN(anon_sym_dbSingle);
      END_STATE();
    case 129:
      if (lookahead == 'a') ADVANCE(141);
      END_STATE();
    case 130:
      if (lookahead == 'a') ADVANCE(142);
      END_STATE();
    case 131:
      if (lookahead == 'd') ADVANCE(143);
      END_STATE();
    case 132:
      if (lookahead == 't') ADVANCE(144);
      END_STATE();
    case 133:
      if (lookahead == 'e') ADVANCE(145);
      END_STATE();
    case 134:
      ACCEPT_TOKEN(anon_sym_dbBoolean);
      END_STATE();
    case 135:
      if (lookahead == 'B') ADVANCE(146);
      if (lookahead == 'D') ADVANCE(147);
      if (lookahead == 'G') ADVANCE(148);
      if (lookahead == 'I') ADVANCE(149);
      if (lookahead == 'L') ADVANCE(150);
      if (lookahead == 'S') ADVANCE(151);
      if (lookahead == 'T') ADVANCE(152);
      END_STATE();
    case 136:
      if (lookahead == 'y') ADVANCE(153);
      END_STATE();
    case 137:
      ACCEPT_TOKEN(anon_sym_dbDecimal);
      END_STATE();
    case 138:
      ACCEPT_TOKEN(anon_sym_dbInteger);
      END_STATE();
    case 139:
      if (lookahead == 'a') ADVANCE(154);
      END_STATE();
    case 140:
      ACCEPT_TOKEN(anon_sym_dbNumeric);
      END_STATE();
    case 141:
      if (lookahead == 'm') ADVANCE(155);
      END_STATE();
    case 142:
      if (lookahead == 'r') ADVANCE(156);
      END_STATE();
    case 143:
      if (lookahead == 'F') ADVANCE(157);
      END_STATE();
    case 144:
      ACCEPT_TOKEN(anon_sym_NotDefault);
      END_STATE();
    case 145:
      if (lookahead == 'n') ADVANCE(158);
      END_STATE();
    case 146:
      if (lookahead == 'y') ADVANCE(159);
      END_STATE();
    case 147:
      if (lookahead == 'e') ADVANCE(160);
      if (lookahead == 'o') ADVANCE(161);
      END_STATE();
    case 148:
      if (lookahead == 'U') ADVANCE(162);
      END_STATE();
    case 149:
      if (lookahead == 'n') ADVANCE(163);
      END_STATE();
    case 150:
      if (lookahead == 'o') ADVANCE(164);
      END_STATE();
    case 151:
      if (lookahead == 'i') ADVANCE(165);
      END_STATE();
    case 152:
      if (lookahead == 'e') ADVANCE(166);
      END_STATE();
    case 153:
      ACCEPT_TOKEN(anon_sym_dbCurrency);
      END_STATE();
    case 154:
      if (lookahead == 'r') ADVANCE(167);
      END_STATE();
    case 155:
      if (lookahead == 'p') ADVANCE(168);
      END_STATE();
    case 156:
      if (lookahead == 'y') ADVANCE(169);
      END_STATE();
    case 157:
      if (lookahead == 'o') ADVANCE(170);
      END_STATE();
    case 158:
      if (lookahead == 't') ADVANCE(171);
      END_STATE();
    case 159:
      if (lookahead == 't') ADVANCE(172);
      END_STATE();
    case 160:
      if (lookahead == 'c') ADVANCE(173);
      END_STATE();
    case 161:
      if (lookahead == 'u') ADVANCE(174);
      END_STATE();
    case 162:
      if (lookahead == 'I') ADVANCE(175);
      END_STATE();
    case 163:
      if (lookahead == 't') ADVANCE(176);
      END_STATE();
    case 164:
      if (lookahead == 'n') ADVANCE(177);
      END_STATE();
    case 165:
      if (lookahead == 'n') ADVANCE(178);
      END_STATE();
    case 166:
      if (lookahead == 'x') ADVANCE(179);
      END_STATE();
    case 167:
      if (lookahead == 'y') ADVANCE(180);
      END_STATE();
    case 168:
      ACCEPT_TOKEN(anon_sym_dbTimeStamp);
      END_STATE();
    case 169:
      ACCEPT_TOKEN(anon_sym_dbVarBinary);
      END_STATE();
    case 170:
      if (lookahead == 'r') ADVANCE(181);
      END_STATE();
    case 171:
      ACCEPT_TOKEN(anon_sym_dbAttachment);
      END_STATE();
    case 172:
      if (lookahead == 'e') ADVANCE(182);
      END_STATE();
    case 173:
      if (lookahead == 'i') ADVANCE(183);
      END_STATE();
    case 174:
      if (lookahead == 'b') ADVANCE(184);
      END_STATE();
    case 175:
      if (lookahead == 'D') ADVANCE(185);
      END_STATE();
    case 176:
      if (lookahead == 'e') ADVANCE(186);
      END_STATE();
    case 177:
      if (lookahead == 'g') ADVANCE(187);
      END_STATE();
    case 178:
      if (lookahead == 'g') ADVANCE(188);
      END_STATE();
    case 179:
      if (lookahead == 't') ADVANCE(189);
      END_STATE();
    case 180:
      ACCEPT_TOKEN(anon_sym_dbLongBinary);
      END_STATE();
    case 181:
      if (lookahead == 'm') ADVANCE(190);
      END_STATE();
    case 182:
      ACCEPT_TOKEN(anon_sym_dbComplexByte);
      END_STATE();
    case 183:
      if (lookahead == 'm') ADVANCE(191);
      END_STATE();
    case 184:
      if (lookahead == 'l') ADVANCE(192);
      END_STATE();
    case 185:
      ACCEPT_TOKEN(anon_sym_dbComplexGUID);
      END_STATE();
    case 186:
      if (lookahead == 'g') ADVANCE(193);
      END_STATE();
    case 187:
      ACCEPT_TOKEN(anon_sym_dbComplexLong);
      END_STATE();
    case 188:
      if (lookahead == 'l') ADVANCE(194);
      END_STATE();
    case 189:
      ACCEPT_TOKEN(anon_sym_dbComplexText);
      END_STATE();
    case 190:
      ACCEPT_TOKEN(anon_sym_CodeBehindForm);
      END_STATE();
    case 191:
      if (lookahead == 'a') ADVANCE(195);
      END_STATE();
    case 192:
      if (lookahead == 'e') ADVANCE(196);
      END_STATE();
    case 193:
      if (lookahead == 'e') ADVANCE(197);
      END_STATE();
    case 194:
      if (lookahead == 'e') ADVANCE(198);
      END_STATE();
    case 195:
      if (lookahead == 'l') ADVANCE(199);
      END_STATE();
    case 196:
      ACCEPT_TOKEN(anon_sym_dbComplexDouble);
      END_STATE();
    case 197:
      if (lookahead == 'r') ADVANCE(200);
      END_STATE();
    case 198:
      ACCEPT_TOKEN(anon_sym_dbComplexSingle);
      END_STATE();
    case 199:
      ACCEPT_TOKEN(anon_sym_dbComplexDecimal);
      END_STATE();
    case 200:
      ACCEPT_TOKEN(anon_sym_dbComplexInteger);
      END_STATE();
    default:
      return false;
  }
}

static TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 10},
  [2] = {.lex_state = 10},
  [3] = {.lex_state = 10},
  [4] = {.lex_state = 10},
  [5] = {.lex_state = 10},
  [6] = {.lex_state = 10},
  [7] = {.lex_state = 10},
  [8] = {.lex_state = 10},
  [9] = {.lex_state = 10},
  [10] = {.lex_state = 10},
  [11] = {.lex_state = 10},
  [12] = {.lex_state = 10},
  [13] = {.lex_state = 10},
  [14] = {.lex_state = 3},
  [15] = {.lex_state = 1},
  [16] = {.lex_state = 2},
  [17] = {.lex_state = 1},
  [18] = {.lex_state = 2},
  [19] = {.lex_state = 2},
  [20] = {.lex_state = 1},
  [21] = {.lex_state = 1},
  [22] = {.lex_state = 1},
  [23] = {.lex_state = 2},
  [24] = {.lex_state = 2},
  [25] = {.lex_state = 2},
  [26] = {.lex_state = 10},
  [27] = {.lex_state = 2},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 2},
  [31] = {.lex_state = 2},
  [32] = {.lex_state = 2},
  [33] = {.lex_state = 0},
  [34] = {.lex_state = 2},
  [35] = {.lex_state = 2},
  [36] = {.lex_state = 0},
  [37] = {.lex_state = 2},
  [38] = {.lex_state = 2},
  [39] = {.lex_state = 0},
  [40] = {.lex_state = 2},
  [41] = {.lex_state = 0},
  [42] = {.lex_state = 2},
  [43] = {.lex_state = 2},
  [44] = {.lex_state = 2},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 27},
  [47] = {.lex_state = 2},
};

static uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_identifier] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_DQUOTE] = ACTIONS(1),
    [sym_number] = ACTIONS(1),
    [aux_sym_hex_value_token1] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_NotDefault] = ACTIONS(1),
    [anon_sym_dbAttachment] = ACTIONS(1),
    [anon_sym_dbBigInt] = ACTIONS(1),
    [anon_sym_dbBinary] = ACTIONS(1),
    [anon_sym_dbBoolean] = ACTIONS(1),
    [anon_sym_dbByte] = ACTIONS(1),
    [anon_sym_dbChar] = ACTIONS(1),
    [anon_sym_dbComplexByte] = ACTIONS(1),
    [anon_sym_dbComplexDecimal] = ACTIONS(1),
    [anon_sym_dbComplexDouble] = ACTIONS(1),
    [anon_sym_dbComplexGUID] = ACTIONS(1),
    [anon_sym_dbComplexInteger] = ACTIONS(1),
    [anon_sym_dbComplexLong] = ACTIONS(1),
    [anon_sym_dbComplexSingle] = ACTIONS(1),
    [anon_sym_dbComplexText] = ACTIONS(1),
    [anon_sym_dbCurrency] = ACTIONS(1),
    [anon_sym_dbDate] = ACTIONS(1),
    [anon_sym_dbDecimal] = ACTIONS(1),
    [anon_sym_dbDouble] = ACTIONS(1),
    [anon_sym_dbFloat] = ACTIONS(1),
    [anon_sym_dbGUID] = ACTIONS(1),
    [anon_sym_dbInteger] = ACTIONS(1),
    [anon_sym_dbLong] = ACTIONS(1),
    [anon_sym_dbLongBinary] = ACTIONS(1),
    [anon_sym_dbMemo] = ACTIONS(1),
    [anon_sym_dbNumeric] = ACTIONS(1),
    [anon_sym_dbSingle] = ACTIONS(1),
    [anon_sym_dbText] = ACTIONS(1),
    [anon_sym_dbTime] = ACTIONS(1),
    [anon_sym_dbTimeStamp] = ACTIONS(1),
    [anon_sym_dbVarBinary] = ACTIONS(1),
    [anon_sym_Begin] = ACTIONS(1),
    [anon_sym_End] = ACTIONS(1),
    [anon_sym_CodeBehindForm] = ACTIONS(1),
  },
  [1] = {
    [sym_dump] = STATE(36),
    [sym__expression] = STATE(3),
    [sym_string] = STATE(37),
    [sym_hex_value] = STATE(23),
    [sym_assignment] = STATE(37),
    [sym_assignment_with_type] = STATE(37),
    [sym_block] = STATE(37),
    [sym_code_section] = STATE(3),
    [aux_sym_dump_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(3),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_CodeBehindForm] = ACTIONS(15),
  },
  [2] = {
    [sym__expression] = STATE(2),
    [sym_string] = STATE(37),
    [sym_hex_value] = STATE(23),
    [sym_assignment] = STATE(37),
    [sym_assignment_with_type] = STATE(37),
    [sym_block] = STATE(37),
    [sym_code_section] = STATE(2),
    [aux_sym_dump_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(17),
    [sym_identifier] = ACTIONS(19),
    [anon_sym_DQUOTE] = ACTIONS(22),
    [aux_sym_hex_value_token1] = ACTIONS(25),
    [anon_sym_dbAttachment] = ACTIONS(28),
    [anon_sym_dbBigInt] = ACTIONS(28),
    [anon_sym_dbBinary] = ACTIONS(28),
    [anon_sym_dbBoolean] = ACTIONS(28),
    [anon_sym_dbByte] = ACTIONS(28),
    [anon_sym_dbChar] = ACTIONS(28),
    [anon_sym_dbComplexByte] = ACTIONS(28),
    [anon_sym_dbComplexDecimal] = ACTIONS(28),
    [anon_sym_dbComplexDouble] = ACTIONS(28),
    [anon_sym_dbComplexGUID] = ACTIONS(28),
    [anon_sym_dbComplexInteger] = ACTIONS(28),
    [anon_sym_dbComplexLong] = ACTIONS(28),
    [anon_sym_dbComplexSingle] = ACTIONS(28),
    [anon_sym_dbComplexText] = ACTIONS(28),
    [anon_sym_dbCurrency] = ACTIONS(28),
    [anon_sym_dbDate] = ACTIONS(28),
    [anon_sym_dbDecimal] = ACTIONS(28),
    [anon_sym_dbDouble] = ACTIONS(28),
    [anon_sym_dbFloat] = ACTIONS(28),
    [anon_sym_dbGUID] = ACTIONS(28),
    [anon_sym_dbInteger] = ACTIONS(28),
    [anon_sym_dbLong] = ACTIONS(28),
    [anon_sym_dbLongBinary] = ACTIONS(28),
    [anon_sym_dbMemo] = ACTIONS(28),
    [anon_sym_dbNumeric] = ACTIONS(28),
    [anon_sym_dbSingle] = ACTIONS(28),
    [anon_sym_dbText] = ACTIONS(28),
    [anon_sym_dbTime] = ACTIONS(28),
    [anon_sym_dbTimeStamp] = ACTIONS(28),
    [anon_sym_dbVarBinary] = ACTIONS(28),
    [anon_sym_Begin] = ACTIONS(31),
    [anon_sym_CodeBehindForm] = ACTIONS(34),
  },
  [3] = {
    [sym__expression] = STATE(2),
    [sym_string] = STATE(37),
    [sym_hex_value] = STATE(23),
    [sym_assignment] = STATE(37),
    [sym_assignment_with_type] = STATE(37),
    [sym_block] = STATE(37),
    [sym_code_section] = STATE(2),
    [aux_sym_dump_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(37),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_CodeBehindForm] = ACTIONS(15),
  },
  [4] = {
    [sym__expression] = STATE(4),
    [sym_string] = STATE(44),
    [sym_hex_value] = STATE(18),
    [sym_assignment] = STATE(44),
    [sym_assignment_with_type] = STATE(44),
    [sym_block] = STATE(44),
    [aux_sym_block_repeat1] = STATE(4),
    [sym_identifier] = ACTIONS(39),
    [anon_sym_DQUOTE] = ACTIONS(42),
    [aux_sym_hex_value_token1] = ACTIONS(45),
    [anon_sym_dbAttachment] = ACTIONS(48),
    [anon_sym_dbBigInt] = ACTIONS(48),
    [anon_sym_dbBinary] = ACTIONS(48),
    [anon_sym_dbBoolean] = ACTIONS(48),
    [anon_sym_dbByte] = ACTIONS(48),
    [anon_sym_dbChar] = ACTIONS(48),
    [anon_sym_dbComplexByte] = ACTIONS(48),
    [anon_sym_dbComplexDecimal] = ACTIONS(48),
    [anon_sym_dbComplexDouble] = ACTIONS(48),
    [anon_sym_dbComplexGUID] = ACTIONS(48),
    [anon_sym_dbComplexInteger] = ACTIONS(48),
    [anon_sym_dbComplexLong] = ACTIONS(48),
    [anon_sym_dbComplexSingle] = ACTIONS(48),
    [anon_sym_dbComplexText] = ACTIONS(48),
    [anon_sym_dbCurrency] = ACTIONS(48),
    [anon_sym_dbDate] = ACTIONS(48),
    [anon_sym_dbDecimal] = ACTIONS(48),
    [anon_sym_dbDouble] = ACTIONS(48),
    [anon_sym_dbFloat] = ACTIONS(48),
    [anon_sym_dbGUID] = ACTIONS(48),
    [anon_sym_dbInteger] = ACTIONS(48),
    [anon_sym_dbLong] = ACTIONS(48),
    [anon_sym_dbLongBinary] = ACTIONS(48),
    [anon_sym_dbMemo] = ACTIONS(48),
    [anon_sym_dbNumeric] = ACTIONS(48),
    [anon_sym_dbSingle] = ACTIONS(48),
    [anon_sym_dbText] = ACTIONS(48),
    [anon_sym_dbTime] = ACTIONS(48),
    [anon_sym_dbTimeStamp] = ACTIONS(48),
    [anon_sym_dbVarBinary] = ACTIONS(48),
    [anon_sym_Begin] = ACTIONS(51),
    [anon_sym_End] = ACTIONS(54),
  },
  [5] = {
    [sym__expression] = STATE(4),
    [sym_string] = STATE(44),
    [sym_hex_value] = STATE(18),
    [sym_assignment] = STATE(44),
    [sym_assignment_with_type] = STATE(44),
    [sym_block] = STATE(44),
    [aux_sym_block_repeat1] = STATE(4),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_End] = ACTIONS(56),
  },
  [6] = {
    [sym__expression] = STATE(4),
    [sym_string] = STATE(44),
    [sym_hex_value] = STATE(18),
    [sym_assignment] = STATE(44),
    [sym_assignment_with_type] = STATE(44),
    [sym_block] = STATE(44),
    [aux_sym_block_repeat1] = STATE(4),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_End] = ACTIONS(58),
  },
  [7] = {
    [sym__expression] = STATE(5),
    [sym_string] = STATE(44),
    [sym_hex_value] = STATE(18),
    [sym_assignment] = STATE(44),
    [sym_assignment_with_type] = STATE(44),
    [sym_block] = STATE(44),
    [aux_sym_block_repeat1] = STATE(5),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_End] = ACTIONS(58),
  },
  [8] = {
    [sym__expression] = STATE(6),
    [sym_string] = STATE(44),
    [sym_hex_value] = STATE(18),
    [sym_assignment] = STATE(44),
    [sym_assignment_with_type] = STATE(44),
    [sym_block] = STATE(44),
    [aux_sym_block_repeat1] = STATE(6),
    [sym_identifier] = ACTIONS(5),
    [anon_sym_DQUOTE] = ACTIONS(7),
    [aux_sym_hex_value_token1] = ACTIONS(9),
    [anon_sym_dbAttachment] = ACTIONS(11),
    [anon_sym_dbBigInt] = ACTIONS(11),
    [anon_sym_dbBinary] = ACTIONS(11),
    [anon_sym_dbBoolean] = ACTIONS(11),
    [anon_sym_dbByte] = ACTIONS(11),
    [anon_sym_dbChar] = ACTIONS(11),
    [anon_sym_dbComplexByte] = ACTIONS(11),
    [anon_sym_dbComplexDecimal] = ACTIONS(11),
    [anon_sym_dbComplexDouble] = ACTIONS(11),
    [anon_sym_dbComplexGUID] = ACTIONS(11),
    [anon_sym_dbComplexInteger] = ACTIONS(11),
    [anon_sym_dbComplexLong] = ACTIONS(11),
    [anon_sym_dbComplexSingle] = ACTIONS(11),
    [anon_sym_dbComplexText] = ACTIONS(11),
    [anon_sym_dbCurrency] = ACTIONS(11),
    [anon_sym_dbDate] = ACTIONS(11),
    [anon_sym_dbDecimal] = ACTIONS(11),
    [anon_sym_dbDouble] = ACTIONS(11),
    [anon_sym_dbFloat] = ACTIONS(11),
    [anon_sym_dbGUID] = ACTIONS(11),
    [anon_sym_dbInteger] = ACTIONS(11),
    [anon_sym_dbLong] = ACTIONS(11),
    [anon_sym_dbLongBinary] = ACTIONS(11),
    [anon_sym_dbMemo] = ACTIONS(11),
    [anon_sym_dbNumeric] = ACTIONS(11),
    [anon_sym_dbSingle] = ACTIONS(11),
    [anon_sym_dbText] = ACTIONS(11),
    [anon_sym_dbTime] = ACTIONS(11),
    [anon_sym_dbTimeStamp] = ACTIONS(11),
    [anon_sym_dbVarBinary] = ACTIONS(11),
    [anon_sym_Begin] = ACTIONS(13),
    [anon_sym_End] = ACTIONS(60),
  },
  [9] = {
    [ts_builtin_sym_end] = ACTIONS(62),
    [sym_identifier] = ACTIONS(64),
    [anon_sym_DQUOTE] = ACTIONS(62),
    [aux_sym_hex_value_token1] = ACTIONS(62),
    [anon_sym_dbAttachment] = ACTIONS(64),
    [anon_sym_dbBigInt] = ACTIONS(64),
    [anon_sym_dbBinary] = ACTIONS(64),
    [anon_sym_dbBoolean] = ACTIONS(64),
    [anon_sym_dbByte] = ACTIONS(64),
    [anon_sym_dbChar] = ACTIONS(64),
    [anon_sym_dbComplexByte] = ACTIONS(64),
    [anon_sym_dbComplexDecimal] = ACTIONS(64),
    [anon_sym_dbComplexDouble] = ACTIONS(64),
    [anon_sym_dbComplexGUID] = ACTIONS(64),
    [anon_sym_dbComplexInteger] = ACTIONS(64),
    [anon_sym_dbComplexLong] = ACTIONS(64),
    [anon_sym_dbComplexSingle] = ACTIONS(64),
    [anon_sym_dbComplexText] = ACTIONS(64),
    [anon_sym_dbCurrency] = ACTIONS(64),
    [anon_sym_dbDate] = ACTIONS(64),
    [anon_sym_dbDecimal] = ACTIONS(64),
    [anon_sym_dbDouble] = ACTIONS(64),
    [anon_sym_dbFloat] = ACTIONS(64),
    [anon_sym_dbGUID] = ACTIONS(64),
    [anon_sym_dbInteger] = ACTIONS(64),
    [anon_sym_dbLong] = ACTIONS(64),
    [anon_sym_dbLongBinary] = ACTIONS(64),
    [anon_sym_dbMemo] = ACTIONS(64),
    [anon_sym_dbNumeric] = ACTIONS(64),
    [anon_sym_dbSingle] = ACTIONS(64),
    [anon_sym_dbText] = ACTIONS(64),
    [anon_sym_dbTime] = ACTIONS(64),
    [anon_sym_dbTimeStamp] = ACTIONS(64),
    [anon_sym_dbVarBinary] = ACTIONS(64),
    [anon_sym_Begin] = ACTIONS(64),
    [anon_sym_CodeBehindForm] = ACTIONS(64),
  },
  [10] = {
    [ts_builtin_sym_end] = ACTIONS(66),
    [sym_identifier] = ACTIONS(68),
    [anon_sym_DQUOTE] = ACTIONS(66),
    [aux_sym_hex_value_token1] = ACTIONS(66),
    [anon_sym_dbAttachment] = ACTIONS(68),
    [anon_sym_dbBigInt] = ACTIONS(68),
    [anon_sym_dbBinary] = ACTIONS(68),
    [anon_sym_dbBoolean] = ACTIONS(68),
    [anon_sym_dbByte] = ACTIONS(68),
    [anon_sym_dbChar] = ACTIONS(68),
    [anon_sym_dbComplexByte] = ACTIONS(68),
    [anon_sym_dbComplexDecimal] = ACTIONS(68),
    [anon_sym_dbComplexDouble] = ACTIONS(68),
    [anon_sym_dbComplexGUID] = ACTIONS(68),
    [anon_sym_dbComplexInteger] = ACTIONS(68),
    [anon_sym_dbComplexLong] = ACTIONS(68),
    [anon_sym_dbComplexSingle] = ACTIONS(68),
    [anon_sym_dbComplexText] = ACTIONS(68),
    [anon_sym_dbCurrency] = ACTIONS(68),
    [anon_sym_dbDate] = ACTIONS(68),
    [anon_sym_dbDecimal] = ACTIONS(68),
    [anon_sym_dbDouble] = ACTIONS(68),
    [anon_sym_dbFloat] = ACTIONS(68),
    [anon_sym_dbGUID] = ACTIONS(68),
    [anon_sym_dbInteger] = ACTIONS(68),
    [anon_sym_dbLong] = ACTIONS(68),
    [anon_sym_dbLongBinary] = ACTIONS(68),
    [anon_sym_dbMemo] = ACTIONS(68),
    [anon_sym_dbNumeric] = ACTIONS(68),
    [anon_sym_dbSingle] = ACTIONS(68),
    [anon_sym_dbText] = ACTIONS(68),
    [anon_sym_dbTime] = ACTIONS(68),
    [anon_sym_dbTimeStamp] = ACTIONS(68),
    [anon_sym_dbVarBinary] = ACTIONS(68),
    [anon_sym_Begin] = ACTIONS(68),
    [anon_sym_CodeBehindForm] = ACTIONS(68),
  },
  [11] = {
    [ts_builtin_sym_end] = ACTIONS(70),
    [sym_identifier] = ACTIONS(72),
    [anon_sym_DQUOTE] = ACTIONS(70),
    [aux_sym_hex_value_token1] = ACTIONS(70),
    [anon_sym_dbAttachment] = ACTIONS(72),
    [anon_sym_dbBigInt] = ACTIONS(72),
    [anon_sym_dbBinary] = ACTIONS(72),
    [anon_sym_dbBoolean] = ACTIONS(72),
    [anon_sym_dbByte] = ACTIONS(72),
    [anon_sym_dbChar] = ACTIONS(72),
    [anon_sym_dbComplexByte] = ACTIONS(72),
    [anon_sym_dbComplexDecimal] = ACTIONS(72),
    [anon_sym_dbComplexDouble] = ACTIONS(72),
    [anon_sym_dbComplexGUID] = ACTIONS(72),
    [anon_sym_dbComplexInteger] = ACTIONS(72),
    [anon_sym_dbComplexLong] = ACTIONS(72),
    [anon_sym_dbComplexSingle] = ACTIONS(72),
    [anon_sym_dbComplexText] = ACTIONS(72),
    [anon_sym_dbCurrency] = ACTIONS(72),
    [anon_sym_dbDate] = ACTIONS(72),
    [anon_sym_dbDecimal] = ACTIONS(72),
    [anon_sym_dbDouble] = ACTIONS(72),
    [anon_sym_dbFloat] = ACTIONS(72),
    [anon_sym_dbGUID] = ACTIONS(72),
    [anon_sym_dbInteger] = ACTIONS(72),
    [anon_sym_dbLong] = ACTIONS(72),
    [anon_sym_dbLongBinary] = ACTIONS(72),
    [anon_sym_dbMemo] = ACTIONS(72),
    [anon_sym_dbNumeric] = ACTIONS(72),
    [anon_sym_dbSingle] = ACTIONS(72),
    [anon_sym_dbText] = ACTIONS(72),
    [anon_sym_dbTime] = ACTIONS(72),
    [anon_sym_dbTimeStamp] = ACTIONS(72),
    [anon_sym_dbVarBinary] = ACTIONS(72),
    [anon_sym_Begin] = ACTIONS(72),
    [anon_sym_CodeBehindForm] = ACTIONS(72),
  },
  [12] = {
    [sym_identifier] = ACTIONS(68),
    [anon_sym_DQUOTE] = ACTIONS(66),
    [aux_sym_hex_value_token1] = ACTIONS(66),
    [anon_sym_dbAttachment] = ACTIONS(68),
    [anon_sym_dbBigInt] = ACTIONS(68),
    [anon_sym_dbBinary] = ACTIONS(68),
    [anon_sym_dbBoolean] = ACTIONS(68),
    [anon_sym_dbByte] = ACTIONS(68),
    [anon_sym_dbChar] = ACTIONS(68),
    [anon_sym_dbComplexByte] = ACTIONS(68),
    [anon_sym_dbComplexDecimal] = ACTIONS(68),
    [anon_sym_dbComplexDouble] = ACTIONS(68),
    [anon_sym_dbComplexGUID] = ACTIONS(68),
    [anon_sym_dbComplexInteger] = ACTIONS(68),
    [anon_sym_dbComplexLong] = ACTIONS(68),
    [anon_sym_dbComplexSingle] = ACTIONS(68),
    [anon_sym_dbComplexText] = ACTIONS(68),
    [anon_sym_dbCurrency] = ACTIONS(68),
    [anon_sym_dbDate] = ACTIONS(68),
    [anon_sym_dbDecimal] = ACTIONS(68),
    [anon_sym_dbDouble] = ACTIONS(68),
    [anon_sym_dbFloat] = ACTIONS(68),
    [anon_sym_dbGUID] = ACTIONS(68),
    [anon_sym_dbInteger] = ACTIONS(68),
    [anon_sym_dbLong] = ACTIONS(68),
    [anon_sym_dbLongBinary] = ACTIONS(68),
    [anon_sym_dbMemo] = ACTIONS(68),
    [anon_sym_dbNumeric] = ACTIONS(68),
    [anon_sym_dbSingle] = ACTIONS(68),
    [anon_sym_dbText] = ACTIONS(68),
    [anon_sym_dbTime] = ACTIONS(68),
    [anon_sym_dbTimeStamp] = ACTIONS(68),
    [anon_sym_dbVarBinary] = ACTIONS(68),
    [anon_sym_Begin] = ACTIONS(68),
    [anon_sym_End] = ACTIONS(68),
  },
  [13] = {
    [sym_identifier] = ACTIONS(64),
    [anon_sym_DQUOTE] = ACTIONS(62),
    [aux_sym_hex_value_token1] = ACTIONS(62),
    [anon_sym_dbAttachment] = ACTIONS(64),
    [anon_sym_dbBigInt] = ACTIONS(64),
    [anon_sym_dbBinary] = ACTIONS(64),
    [anon_sym_dbBoolean] = ACTIONS(64),
    [anon_sym_dbByte] = ACTIONS(64),
    [anon_sym_dbChar] = ACTIONS(64),
    [anon_sym_dbComplexByte] = ACTIONS(64),
    [anon_sym_dbComplexDecimal] = ACTIONS(64),
    [anon_sym_dbComplexDouble] = ACTIONS(64),
    [anon_sym_dbComplexGUID] = ACTIONS(64),
    [anon_sym_dbComplexInteger] = ACTIONS(64),
    [anon_sym_dbComplexLong] = ACTIONS(64),
    [anon_sym_dbComplexSingle] = ACTIONS(64),
    [anon_sym_dbComplexText] = ACTIONS(64),
    [anon_sym_dbCurrency] = ACTIONS(64),
    [anon_sym_dbDate] = ACTIONS(64),
    [anon_sym_dbDecimal] = ACTIONS(64),
    [anon_sym_dbDouble] = ACTIONS(64),
    [anon_sym_dbFloat] = ACTIONS(64),
    [anon_sym_dbGUID] = ACTIONS(64),
    [anon_sym_dbInteger] = ACTIONS(64),
    [anon_sym_dbLong] = ACTIONS(64),
    [anon_sym_dbLongBinary] = ACTIONS(64),
    [anon_sym_dbMemo] = ACTIONS(64),
    [anon_sym_dbNumeric] = ACTIONS(64),
    [anon_sym_dbSingle] = ACTIONS(64),
    [anon_sym_dbText] = ACTIONS(64),
    [anon_sym_dbTime] = ACTIONS(64),
    [anon_sym_dbTimeStamp] = ACTIONS(64),
    [anon_sym_dbVarBinary] = ACTIONS(64),
    [anon_sym_Begin] = ACTIONS(64),
    [anon_sym_End] = ACTIONS(64),
  },
};

static uint16_t ts_small_parse_table[] = {
  [0] = 4,
    ACTIONS(7), 1,
      anon_sym_DQUOTE,
    ACTIONS(76), 1,
      anon_sym_Begin,
    ACTIONS(74), 2,
      sym_number,
      anon_sym_NotDefault,
    STATE(31), 2,
      sym_string,
      sym_block,
  [15] = 3,
    ACTIONS(78), 1,
      anon_sym_DQUOTE,
    ACTIONS(80), 1,
      aux_sym_string_token1,
    STATE(22), 1,
      aux_sym_string_repeat1,
  [25] = 3,
    ACTIONS(82), 1,
      anon_sym_COMMA,
    ACTIONS(84), 1,
      sym__newline,
    STATE(24), 1,
      aux_sym__expression_repeat1,
  [35] = 3,
    ACTIONS(80), 1,
      aux_sym_string_token1,
    ACTIONS(86), 1,
      anon_sym_DQUOTE,
    STATE(22), 1,
      aux_sym_string_repeat1,
  [45] = 3,
    ACTIONS(82), 1,
      anon_sym_COMMA,
    ACTIONS(88), 1,
      sym__newline,
    STATE(16), 1,
      aux_sym__expression_repeat1,
  [55] = 3,
    ACTIONS(82), 1,
      anon_sym_COMMA,
    ACTIONS(90), 1,
      sym__newline,
    STATE(24), 1,
      aux_sym__expression_repeat1,
  [65] = 3,
    ACTIONS(92), 1,
      anon_sym_DQUOTE,
    ACTIONS(94), 1,
      aux_sym_string_token1,
    STATE(17), 1,
      aux_sym_string_repeat1,
  [75] = 3,
    ACTIONS(96), 1,
      anon_sym_DQUOTE,
    ACTIONS(98), 1,
      aux_sym_string_token1,
    STATE(15), 1,
      aux_sym_string_repeat1,
  [85] = 3,
    ACTIONS(100), 1,
      anon_sym_DQUOTE,
    ACTIONS(102), 1,
      aux_sym_string_token1,
    STATE(22), 1,
      aux_sym_string_repeat1,
  [95] = 3,
    ACTIONS(82), 1,
      anon_sym_COMMA,
    ACTIONS(105), 1,
      sym__newline,
    STATE(19), 1,
      aux_sym__expression_repeat1,
  [105] = 3,
    ACTIONS(107), 1,
      anon_sym_COMMA,
    ACTIONS(110), 1,
      sym__newline,
    STATE(24), 1,
      aux_sym__expression_repeat1,
  [115] = 2,
    ACTIONS(110), 1,
      sym__newline,
    ACTIONS(112), 1,
      anon_sym_COMMA,
  [122] = 2,
    ACTIONS(9), 1,
      aux_sym_hex_value_token1,
    STATE(25), 1,
      sym_hex_value,
  [129] = 2,
    ACTIONS(114), 1,
      anon_sym_COMMA,
    ACTIONS(116), 1,
      sym__newline,
  [136] = 2,
    ACTIONS(7), 1,
      anon_sym_DQUOTE,
    STATE(34), 1,
      sym_string,
  [143] = 2,
    ACTIONS(118), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      sym_string,
  [150] = 2,
    ACTIONS(120), 1,
      sym_identifier,
    ACTIONS(122), 1,
      sym__newline,
  [157] = 1,
    ACTIONS(124), 1,
      sym__newline,
  [161] = 1,
    ACTIONS(126), 1,
      sym__newline,
  [165] = 1,
    ACTIONS(128), 1,
      anon_sym_EQ,
  [169] = 1,
    ACTIONS(130), 1,
      sym__newline,
  [173] = 1,
    ACTIONS(132), 1,
      sym__newline,
  [177] = 1,
    ACTIONS(134), 1,
      ts_builtin_sym_end,
  [181] = 1,
    ACTIONS(105), 1,
      sym__newline,
  [185] = 1,
    ACTIONS(136), 1,
      sym__newline,
  [189] = 1,
    ACTIONS(138), 1,
      anon_sym_EQ,
  [193] = 1,
    ACTIONS(140), 1,
      sym__newline,
  [197] = 1,
    ACTIONS(142), 1,
      anon_sym_EQ,
  [201] = 1,
    ACTIONS(142), 1,
      sym__newline,
  [205] = 1,
    ACTIONS(138), 1,
      sym__newline,
  [209] = 1,
    ACTIONS(88), 1,
      sym__newline,
  [213] = 1,
    ACTIONS(144), 1,
      anon_sym_EQ,
  [217] = 1,
    ACTIONS(146), 1,
      aux_sym_code_section_token1,
  [221] = 1,
    ACTIONS(148), 1,
      sym__newline,
};

static uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(14)] = 0,
  [SMALL_STATE(15)] = 15,
  [SMALL_STATE(16)] = 25,
  [SMALL_STATE(17)] = 35,
  [SMALL_STATE(18)] = 45,
  [SMALL_STATE(19)] = 55,
  [SMALL_STATE(20)] = 65,
  [SMALL_STATE(21)] = 75,
  [SMALL_STATE(22)] = 85,
  [SMALL_STATE(23)] = 95,
  [SMALL_STATE(24)] = 105,
  [SMALL_STATE(25)] = 115,
  [SMALL_STATE(26)] = 122,
  [SMALL_STATE(27)] = 129,
  [SMALL_STATE(28)] = 136,
  [SMALL_STATE(29)] = 143,
  [SMALL_STATE(30)] = 150,
  [SMALL_STATE(31)] = 157,
  [SMALL_STATE(32)] = 161,
  [SMALL_STATE(33)] = 165,
  [SMALL_STATE(34)] = 169,
  [SMALL_STATE(35)] = 173,
  [SMALL_STATE(36)] = 177,
  [SMALL_STATE(37)] = 181,
  [SMALL_STATE(38)] = 185,
  [SMALL_STATE(39)] = 189,
  [SMALL_STATE(40)] = 193,
  [SMALL_STATE(41)] = 197,
  [SMALL_STATE(42)] = 201,
  [SMALL_STATE(43)] = 205,
  [SMALL_STATE(44)] = 209,
  [SMALL_STATE(45)] = 213,
  [SMALL_STATE(46)] = 217,
  [SMALL_STATE(47)] = 221,
};

static TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_dump, 0),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(45),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(29),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(30),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(32),
  [17] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_dump_repeat1, 2),
  [19] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(45),
  [22] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(21),
  [25] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(27),
  [28] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(29),
  [31] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(30),
  [34] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_dump_repeat1, 2), SHIFT_REPEAT(32),
  [37] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_dump, 1),
  [39] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_block_repeat1, 2), SHIFT_REPEAT(45),
  [42] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_block_repeat1, 2), SHIFT_REPEAT(21),
  [45] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_block_repeat1, 2), SHIFT_REPEAT(27),
  [48] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_block_repeat1, 2), SHIFT_REPEAT(29),
  [51] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_block_repeat1, 2), SHIFT_REPEAT(30),
  [54] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_block_repeat1, 2),
  [56] = {.entry = {.count = 1, .reusable = false}}, SHIFT(38),
  [58] = {.entry = {.count = 1, .reusable = false}}, SHIFT(35),
  [60] = {.entry = {.count = 1, .reusable = false}}, SHIFT(40),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__expression, 2),
  [64] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__expression, 2),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__expression, 3),
  [68] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym__expression, 3),
  [70] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_code_section, 3, .production_id = 2),
  [72] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_code_section, 3, .production_id = 2),
  [74] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [76] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [78] = {.entry = {.count = 1, .reusable = false}}, SHIFT(42),
  [80] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [82] = {.entry = {.count = 1, .reusable = false}}, SHIFT(26),
  [84] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [86] = {.entry = {.count = 1, .reusable = false}}, SHIFT(41),
  [88] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [90] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [92] = {.entry = {.count = 1, .reusable = false}}, SHIFT(39),
  [94] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [96] = {.entry = {.count = 1, .reusable = false}}, SHIFT(43),
  [98] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [100] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_string_repeat1, 2),
  [102] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_string_repeat1, 2), SHIFT_REPEAT(22),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [107] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym__expression_repeat1, 2), SHIFT_REPEAT(26),
  [110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__expression_repeat1, 2),
  [112] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym__expression_repeat1, 2),
  [114] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_hex_value, 1),
  [116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_hex_value, 1),
  [118] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [120] = {.entry = {.count = 1, .reusable = false}}, SHIFT(47),
  [122] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [124] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_assignment, 3, .production_id = 1),
  [126] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [128] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [130] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_assignment_with_type, 4, .production_id = 3),
  [132] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 4),
  [134] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [136] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 5),
  [138] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_string, 2),
  [140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 3),
  [142] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_string, 3),
  [144] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [146] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [148] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_ms_access_dump(void) {
  static TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .parse_table = (const uint16_t *)ts_parse_table,
    .parse_actions = ts_parse_actions,
    .lex_modes = ts_lex_modes,
    .alias_sequences = (const TSSymbol *)ts_alias_sequences,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .lex_fn = ts_lex,
    .keyword_lex_fn = ts_lex_keywords,
    .keyword_capture_token = sym_identifier,
    .field_count = FIELD_COUNT,
    .field_map_slices = (const TSFieldMapSlice *)ts_field_map_slices,
    .field_map_entries = (const TSFieldMapEntry *)ts_field_map_entries,
    .field_names = ts_field_names,
    .large_state_count = LARGE_STATE_COUNT,
    .small_parse_table = (const uint16_t *)ts_small_parse_table,
    .small_parse_table_map = (const uint32_t *)ts_small_parse_table_map,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .state_count = STATE_COUNT,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
