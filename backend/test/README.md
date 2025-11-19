# Party Queue Test Suite

This directory contains test cases for the Party Queue application.

## Test Files

### 1. `queueManager.test.js`
Tests for the QueueManager class functionality:
- Adding songs to queue
- User song count tracking
- Queue rebuilding and interleaving
- Removing songs
- Popping next song

**Run:** `node queueManager.test.js`

### 2. `businessLogic.test.js`
Tests for server-side business rules:
- 15-minute song duration limit
- 30-minute no-repeat rule
- 10 songs per user limit
- 60% skip voting threshold
- History cleanup

**Run:** `node businessLogic.test.js`

### 3. `manualTestCases.js`
Comprehensive manual test scenarios for end-to-end testing:
- Room creation and joining
- Song search and queue management
- All validation rules
- Real-time updates
- Error handling

**Run:** `node manualTestCases.js` (displays test scenarios)

## Running All Tests

From the backend directory:

```bash
# Run all automated tests
npm test

# View manual test scenarios
npm run test:manual
```

## Test Coverage

### Features Tested:

✅ Queue Management
- Add songs
- Remove songs
- Get next song
- User song counting

✅ Business Rules
- Song duration limits (15 min for non-host)
- No-repeat rule (30 minutes)
- User song limit (10 songs max)
- Skip voting (60% threshold)
- History cleanup

✅ Integration Scenarios
- Room creation/joining
- Search functionality
- Real-time updates
- Error messages
- Multi-user interactions

## Adding New Tests

To add new test cases:

1. Use the simple test framework already in place:
```javascript
describe('Feature Name', () => {
    it('should do something', () => {
        // Your test code
        expect(actual).toBe(expected);
    });
});
```

2. Add to existing test files or create new ones
3. Update this README

## Test Results

All tests should pass with ✓ marks. If you see ✗, check the error message for details.
