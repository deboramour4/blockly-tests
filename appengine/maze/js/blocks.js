/**
 * Blockly Games: Maze Blocks
 *
 * Copyright 2012 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Maze application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Maze.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');


/**
 * Common HSV hue for all movement blocks.
 */
Maze.Blocks.MOVEMENT_HUE = 208;

/**
 * HSV hue for loop block.
 */
Maze.Blocks.LOOPS_HUE = 340;

/**
 * Common HSV hue for all logic blocks.
 */
Maze.Blocks.LOGIC_HUE = 120;

/**
 * Left turn arrow to be appended to messages.
 */
Maze.Blocks.LEFT_TURN = ' \u21BA';

/**
 * Left turn arrow to be appended to messages.
 */
Maze.Blocks.RIGHT_TURN = ' \u21BB';

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['maze_moveForward'] = {
  /**
   * Block for moving forward.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "dê um passo",
      "previousStatement": null,
      "nextStatement": null,
      "colour": Maze.Blocks.MOVEMENT_HUE,
      "tooltip": "Faz o robô andar para frente uma vez."
    });
  }
};

Blockly.JavaScript['maze_moveForward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'moveForward(\'block_id_' + block.id + '\');\n';
};

//Blocos customizados  --------------------------------------------------------------
Blockly.Blocks['maze_catchObject'] = {
  init: function() {
    this.jsonInit({
      "message0": "pegue o objeto",
      "previousStatement": null,
      "nextStatement": null,
      "colour": Maze.Blocks.LOOPS_HUE,
      "tooltip": "Pega a peça que o robô está em cima."
    });
  }
};
Blockly.JavaScript['maze_catchObject'] = function(block) {
  return 'catchObject(\'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['maze_jumpForward'] = {
  init: function() {
    this.jsonInit({
      "message0": "pule",
      "previousStatement": null,
      "nextStatement": null,
      "colour": Maze.Blocks.MOVEMENT_HUE,
      "tooltip": "Faz o robô pular para frente, avançando dois blocos de uma vez."
    });
  }
};
Blockly.JavaScript['maze_jumpForward'] = function(block) {
  return 'jumpForward(\'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['maze_ifCustom'] = {
  init: function() {
    this.setColour(Maze.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField('se é o certo');
    this.appendStatementInput('DO')
        .appendField("faça");
    this.setPreviousStatement(true);
    this.setTooltip('Checa se o objeto pegado é o certo.');
  }
};
Blockly.JavaScript['maze_ifCustom'] = function(block) {
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + block.id + '\'') + branch;
  }
  return 'if (isTheRightOne()) {\n' + branch + '}\n';
};

// HUB Blocks ---------------------------------------
Blockly.Blocks['maze_changeGround'] = {
  init: function() {
    var STATES = [['sujo', 'groundDirty'], ['limpo', 'groundClean']];

    this.setColour(10);
    this.appendDummyInput()
        .appendField("chão ")
        .appendField(new Blockly.FieldDropdown(STATES), 'STA');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Escolha se você quer o chão da rua sujo ou limpo.');
  }
};
Blockly.JavaScript['maze_changeGround'] = function(block) {
  var ground = block.getFieldValue('STA');
  return ground + '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['maze_changeEnviroment'] = {
  init: function() {
    var STATES = [['sem árvore', 'enviromentDeforested'], ['com árvores', 'enviromentForested']];
    this.setColour(197);
    this.appendDummyInput()
        .appendField("ambiente ")
        .appendField(new Blockly.FieldDropdown(STATES), 'STA');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Escolha se você quer que o ambiente tenha poucas árvores ou muitas árvores.');
  }
};
Blockly.JavaScript['maze_changeEnviroment'] = function(block) {
  var enviroment = block.getFieldValue('STA');
  return enviroment + '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['maze_changeSpeaker'] = {
  init: function() {
    var STATES = [['desligado', 'speakerOff'], ['ligado', 'speakerOn']];

    this.setColour(300);
    this.appendDummyInput()
        .appendField("som ")
        .appendField(new Blockly.FieldDropdown(STATES), 'STA');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Escolha se você quer o som ligado ou desligado.');
  }
};
Blockly.JavaScript['maze_changeSpeaker'] = function(block) {
  var speaker = block.getFieldValue('STA');
  return speaker + '(\'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['maze_changeStreet'] = {
  init: function() {
    var STATES = [['terra batida', 'streetUnpaved'], ['asfalto', 'streetPaved']];

    this.setColour(300);
    this.appendDummyInput()
        .appendField("rua com ")
        .appendField(new Blockly.FieldDropdown(STATES), 'STA');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Escolha se você quer quea rua esteja só com terra ou com asfalto.');
  }
};
Blockly.JavaScript['maze_changeStreet'] = function(block) {
  var street = block.getFieldValue('STA');
  return street + '(\'block_id_' + block.id + '\');\n';
};
//end ------------------------------------------------------------------------------


Blockly.Blocks['maze_turn'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [['gire para  esquerda', 'turnLeft'],
         ['gire para  direita', 'turnRight']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[1][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.MOVEMENT_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Gira o robô para a esquerda ou direita.");
  }
};

Blockly.JavaScript['maze_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var dir = block.getFieldValue('DIR');
  return dir + '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['maze_if'] = {
  /**
   * Block for 'if' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [["se tem caminho na frente", 'isPathForward'],
         ["se tem caminho na esquerda", 'isPathLeft'],
         ["se tem caminho na direita", 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField("faça");
    this.setTooltip("Se tiver uma estrada nesta direção, então o robô faz estas ações.");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['maze_if'] = function(block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Blocks['maze_ifElse'] = {
  /**
   * Block for 'if/else' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [["se tem caminho na frente", 'isPathForward'],
         ["se tem caminho na esquerda", 'isPathLeft'],
         ["se tem caminho na direita", 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Maze.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Maze.Blocks.RIGHT_TURN;
    this.setColour(Maze.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField("faça");
    this.appendStatementInput('ELSE')
        .appendField("senão");
    this.setTooltip("Os blocos se-senão vão fazer uma coisa ou outra.");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['maze_ifElse'] = function(block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};

Blockly.Blocks['maze_forever'] = {
  /**
   * Block for repeat loop.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Maze.Blocks.LOOPS_HUE);
    this.appendDummyInput()
        .appendField("repita até")
        .appendField(new Blockly.FieldImage(Maze.SKIN.marker, 12, 16));
    this.appendStatementInput('DO')
        .appendField("faça");
    this.setPreviousStatement(true);
    this.setTooltip("O robô vai repetir as ações dentro do bloco até que encontre o ponto final do mapa.");
  }
};

Blockly.JavaScript['maze_forever'] = function(block) {
  // Generate JavaScript for repeat loop.
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + block.id + '\'') + branch;
  }
  return 'while (notDone()) {\n' + branch + '}\n';
};
