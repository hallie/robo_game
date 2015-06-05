Blockly.Blocks['robot_turn'] = {
	init: function() {
		this.setHelpUrl('http://www.example.com/');
		this.setColour(270);
		this.appendDummyInput()
			.appendField("Turn")
			.appendField(new Blockly.FieldDropdown(
				[["left", "LEFT"], ["right", "RIGHT"], ["around", "AROUND"]]
			), "robot_direction");
		this.setPreviousStatement(true);
		this.setTooltip('');
	}
};

Blockly.JavaScript['robot_turn'] = function(block) {
  var dropdown_robot_direction = block.getFieldValue('robot_direction');
  console.log(dropdown_robot_direction);
  //var code = '...';
  //return code;
};