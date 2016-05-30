import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/lists/lists.js';
import { Todos } from '../../api/todos/todos.js';
import { Notes } from '../../api/notes/notes.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Lists.find().count() === 0) {
    console.log('new db table');
    const data = [
      {
        name: 'Meteor Principles',
        type: 'todo',
        items: [
          'Data on the Wire',
          'One Language',
          'Database Everywhere',
          'Latency Compensation',
          'Full Stack Reactivity',
          'Embrace the Ecosystem',
          'Simplicity Equals Productivity',
        ],
      },
      {
        name: 'Elon Musk',
        type: 'note',
        content: 'Elon Reeve Musk (/ˈiːlɒn ˈmʌsk/; born June 28, 1971) is a South African-born Canadian-American business magnate, engineer, and investor.'
        + '\nHe is the founder, CEO and CTO of SpaceX; co-founder, CEO and product architect of Tesla Motors; chairman of SolarCity, co-chairman of OpenAI; co-founder of Zip2; and co-founder of PayPal. As of April 2016, he has an estimated net worth of US$12.3 billion, making him the 68th wealthiest person in the US.',
      },
      {
        name: 'Languages',
        type: 'todo',
        items: [
          'Lisp',
          'C',
          'C++',
          'Python',
          'Ruby',
          'JavaScript',
          'Scala',
          'Erlang',
          '6502 Assembly',
        ],
      },
      {
        name: 'Favorite Scientists',
        type: 'todo',
        items: [
          'Ada Lovelace',
          'Grace Hopper',
          'Marie Curie',
          'Carl Friedrich Gauss',
          'Nikola Tesla',
          'Claude Shannon',
        ],

      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      if (list.items)
      {
        const listId = Lists.insert({
          name: list.name,
          type: list.type,
          incompleteCount: list.items.length,
        });

        list.items.forEach((text) => {
          Todos.insert({
            listId,
            text,
            createdAt: new Date(timestamp),
          });
        });
      }
      else
      {
        const listId = Lists.insert({
          name: list.name,
          type: list.type,
          content: list.content,
        });

        Notes.insert({
          listId,
          content: list.content,
          createdAt: new Date(timestamp),
        });
      }

      timestamp += 1; // ensure unique timestamp.
    });
  }
});
