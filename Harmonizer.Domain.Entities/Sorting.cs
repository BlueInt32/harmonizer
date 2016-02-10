namespace Harmonizer.Domain.Entities
{
    public class Sorting
    {
        public string Direction { get; set; }
        public SequenceSortingProperty Property { get; set; }
    }

    public enum SequenceSortingProperty
    {
        Name,
        Rating
    }
}