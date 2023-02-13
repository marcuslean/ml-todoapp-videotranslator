import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('Todo List component', () => {
   // it("contains spec with an expectation", function () {
   //    expect(true).toBe(true);
   // });

   let component: TodoListComponent;
   let fixture: ComponentFixture<TodoListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [TodoListComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
