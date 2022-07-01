## Notes 

* unlike date-fns, looks like luxon does not respect locale in `startOf('week')` function https://github.com/moment/luxon/issues/373. To address this, I manually overrided the implementation of `startOfWeek` in the luxon adaptor. I kind of copied the implementation of [`date-fns/startOfWeek`](https://github.com/date-fns/date-fns/blob/master/src/startOfWeek/index.ts). 

## Needs attention

* Unit tests
* Localization
* When you click on a time slot, it only focuses on the element. It should remain selected when you lose focus
* component does not have callbacks to pass in selected date/time
* big mess passing around props here and there
* poor styling
* no textfield input for date. didn't have enough time to work on that 
* poorly named components

 
