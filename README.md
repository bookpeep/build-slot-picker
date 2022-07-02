## Notes 

* unlike date-fns, looks like luxon does not respect locale in `startOf('week')` function https://github.com/moment/luxon/issues/373. To address this, I manually overrided the implementation of `startOfWeek` in the luxon adaptor. I kind of copied the implementation of [`date-fns/startOfWeek`](https://github.com/date-fns/date-fns/blob/master/src/startOfWeek/index.ts). 

## Needs attention

* no Unit tests
* no Localization. all hardcoded strings
* When you click on a time slot, it only focuses on the element. It should be styled as the selected slot even when you lose focus
* big mess passing around props here and there
* poor styling
* no textfield input for date. didn't have enough time to work on it and considered it out of scope
* poorly named components

 