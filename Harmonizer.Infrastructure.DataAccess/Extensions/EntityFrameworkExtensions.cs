﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Harmonizer.Infrastructure.DataAccess.Extensions
{
	public static class EntityFrameworkExtensions
	{
		public static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other,
			Func<T, TKey> getKey)
		{
			return from item in items
				join otherItem in other on getKey(item)
					equals getKey(otherItem) into tempItems
				from temp in tempItems.DefaultIfEmpty<T>()
				where ReferenceEquals(null, temp) || temp.Equals(default(T))
				select item;

		}
	}
}