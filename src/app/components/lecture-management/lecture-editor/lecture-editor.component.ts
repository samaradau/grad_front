import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.css']
})
export class LectureEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setup();
  }

  updatePrevew(): void {
      var code = <HTMLInputElement> document.getElementById('code');
      var content = document.getElementById('content');
      content.innerHTML = code.value;
  }

  setup(): void {
    var code = <HTMLInputElement> document.getElementById('code');
    var self = this;  
    code.oninput = function () {
        self.updatePrevew();
      }
      code.onkeydown = function () {
        let a = <KeyboardEvent> event;
        if (a.keyCode === 9) {
          var v = code.value, s = code.selectionStart, e = code.selectionEnd;
          code.value = v.substring(0, s) + '\t' + v.substring(e);
          code.selectionStart = code.selectionEnd = s + 1;
          return false;
        }
      }
  }

  inputHTML(text) {
    var code = <HTMLInputElement> document.getElementById('code');
    code.value += '\n' + text;
    this.updatePrevew();
  }
}
