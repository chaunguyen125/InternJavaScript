import {inject} from '@loopback/core';

class MyControllerWithValues {
  constructor(
    @inject(binding => binding.tagNames.includes('foo'), {
      bindingComparator: (a, b) => {
        // // Sort by value of `foo` tag
        return a.tagMap.foo.localeCompare(b.tagMap.foo); // number
      },
    })
    public values: string[],
  ) {}
}