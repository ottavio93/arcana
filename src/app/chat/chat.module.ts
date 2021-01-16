import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';

import { FormsModule } from '@angular/forms';

import { ChatService } from './Chat.service';

@NgModule({
  declarations: [ChatDialogComponent],
  imports: [CommonModule, FormsModule],
  providers: [ChatService],
  exports: [ChatDialogComponent],
})
export class ChatModule {}
