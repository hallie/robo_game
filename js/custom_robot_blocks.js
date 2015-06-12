/*global Blockly, console*/

Blockly.Blocks.robot_turn = {
	init: function () {
		'use strict';
		this.setHelpUrl('');
		this.setColour(270);
		this.appendDummyInput()
			.appendField("turn")
			.appendField(new Blockly.FieldDropdown(
				[
					["left", "LEFT"],
					["right", "RIGHT"],
					["around", "AROUND"]
				]
			), "robot_direction");
		this.setPreviousStatement(true);
		this.setTooltip('');
	}
};

Blockly.Blocks.robot_can_move = {
	init: function () {
		'use strict';
		this.setHelpUrl('https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9346z8');
		this.setColour(160);
		this.appendDummyInput()
			.appendField("can move")
			.appendField(new Blockly.FieldDropdown(
				[
					["forward", "FORWARD"],
					["left", "LEFT"],
					["right", "RIGHT"]
			    ]
			),
				"robot_direction");
		this.setOutput(true, "Boolean");
		this.setTooltip('');
	}
};